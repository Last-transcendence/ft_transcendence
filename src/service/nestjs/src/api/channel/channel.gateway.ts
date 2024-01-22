import { BadRequestException, Inject, UseGuards, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import BanService from 'api/ban/ban.service';
import ParticipantService from 'api/participant/participant.service';
import { Namespace, Socket } from 'socket.io';
import * as Auth from '../../common/auth';
import ChannelService from './channel.service';

const getCorsOrigin = () => {
	const configService = new ConfigService();

	return configService.getOrThrow('NEXTJS_URL');
};

@WebSocketGateway({
	namespace: '/socket/channel',
	cors: { origin: getCorsOrigin(), credentials: true },
})
class ChannelGateway {
	constructor(
		private readonly channelService: ChannelService,
		@Inject(forwardRef(() => ParticipantService))
		private readonly participantService: ParticipantService,
		@Inject(forwardRef(() => BanService)) private readonly banService: BanService,
	) {}

	@WebSocketServer()
	server: Namespace;

	handleConnection() {
		console.log('Client connected to channel namespace');
	}

	@SubscribeMessage('create')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleCreate(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if (await this.participantService.isParticipated(socket.user.id)) {
				const participatedChannel = await this.participantService.get(socket.user.id);
				await this.channelService.leaveChannel(participatedChannel.id);
			}
			const newChannel = await this.channelService.createChannel(data);
			const newParticipant = await this.participantService.create(newChannel.id, socket.user.id);

			await this.participantService.update(newParticipant.id, { role: 'OWNER' });

			socket.join(newChannel.id);
			return { res: true, channelId: newChannel.id };
		} catch (error) {
			console.error("An error occurred channel.gateway 'create':", error);
			socket.emit('error', { message: "An error occurred channel.gateway 'create'" });
			return { res: false };
		}
	}

	@SubscribeMessage('join')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleJoin(@MessageBody() joinData, @ConnectedSocket() socket) {
		try {
			console.log(joinData.channelId);
			const userId = socket.user.id;

			await this.channelService.leaveChannel(userId);

			const channel = await this.channelService.getChannel(joinData.channelId);
			if (!channel) {
				throw new BadRequestException('Channel not found');
			}
			if (await this.banService.isBanned(userId, joinData.channelId)) {
				throw new BadRequestException('User is banned');
			}
			if (
				channel.visibility === 'PROTECTED' &&
				!(await this.channelService.validatePassword(joinData.channelId, joinData.password))
			) {
				throw new BadRequestException('Wrong password');
			}

			await this.participantService.create(joinData.channelId, socket.user.id);
			socket.join(joinData.channelId);
			this.server.to(joinData.channelId).emit('message', {
				userId: socket.user.id,
				nickname: socket.user.nickname,
				profileImageURI: socket.user.profileImageURI,
			});
			return { res: true };
		} catch (error) {
			console.error("An error occurred channel.gateway 'join':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false, message: error };
		}
	}

	@SubscribeMessage('edit')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleEdit(@MessageBody() data, @ConnectedSocket() socket: Socket) {
		try {
			this.channelService.editChannel(data);
			return { res: true };
		} catch (error) {
			console.error("An error occurred in channel.gateway 'edit':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'edit'" });
			return { res: false };
		}
	}

	@SubscribeMessage('info')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleInfo(@MessageBody() data) {
		return this.channelService.getChannel(data.channelId);
	}

	@SubscribeMessage('message')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleMessage(@MessageBody() data, @ConnectedSocket() socket) {
		try {
			const filteredMessage = this.channelService.messageFilter(
				data.channelId,
				data.userId,
				data.message,
			);
			this.server.to(data.channelId).emit('message', {
				channelId: data.channelId,
				userId: socket.user.id,
				message: filteredMessage,
			});
			return { res: true };
		} catch (error) {
			console.error("An error occurred in channel.gateway 'message':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'message'" });
			return { res: false };
		}
	}
}

export default ChannelGateway;
