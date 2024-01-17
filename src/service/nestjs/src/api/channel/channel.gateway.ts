import { BadRequestException, Inject, UseGuards, forwardRef } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import BanService from 'api/ban/ban.service';
import ParticipantService from 'api/participant/participant.service';
import { Server, Socket } from 'socket.io';
import ChannelService from './channel.service';
import * as ChannelDto from './dto';
import * as ParticipantDto from '../participant/dto';
import * as Auth from '../../common/auth';
import { ConfigService } from '@nestjs/config';

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
	server: Server;

	handleConnection() {
		console.log('Client connected to channel namespace');
	}

	@SubscribeMessage('create')
	@UseGuards(Auth.Guard.UserJwtWs)
	async handleCreate(
		@MessageBody() createChannelDto: ChannelDto.Request.Create,
		@ConnectedSocket() socket: Socket,
	) {
		try {
			const newChannel = await this.channelService.createChannel(createChannelDto);
			const newParticipant = await this.participantService.create(
				newChannel.id,
				socket.data.user.id,
			);

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
	@UseGuards(Auth.Guard.UserJwtWs)
	async handleJoin(
		@MessageBody() joinDto: ParticipantDto.Request.Create,
		@ConnectedSocket() socket: Socket,
	) {
		try {
			const userId: string = socket.data.user.id;

			if (await this.participantService.isParticipated(userId)) {
				throw new BadRequestException('User is already participated');
			}

			const channel = await this.channelService.getChannel(joinDto.channelId);
			if (!channel) {
				throw new BadRequestException('Channel not found');
			}
			if (
				channel.visibility === 'PROTECTED' &&
				!(await this.channelService.validatePassword(joinDto.channelId, joinDto.password))
			) {
				throw new BadRequestException('Wrong password');
			}
			if (await this.banService.isBanned(userId, joinDto.channelId)) {
				throw new BadRequestException('User is banned');
			}

			socket.join(joinDto.channelId);

			return { res: true };
		} catch (error) {
			console.error("An error occurred channel.gateway 'join':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false };
		}
	}

	@SubscribeMessage('edit')
	@UseGuards(Auth.Guard.UserJwtWs)
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
}

export default ChannelGateway;
