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
import MuteService from 'api/mute/mute.service';
import ParticipantService from 'api/participant/participant.service';
import UserService from 'api/user/user.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Namespace, Socket } from 'socket.io';
import * as Auth from '../../common/auth';
import * as ParticipantDto from '../participant/dto';
import ChannelService from './channel.service';
import * as Dto from './dto';

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
		private readonly userService: UserService,
		private readonly muteService: MuteService,
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
			await this.channelService.leaveChannel(socket, socket.user.id);

			const newChannel = await this.channelService.createChannel(data);
			const newParticipant = await this.participantService.create({
				channelId: newChannel.id,
				userId: socket.user.id,
				socketId: socket.id,
			});

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
			const userId = socket.user.id;

			await this.channelService.leaveChannel(socket, userId);

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

			await this.participantService.create({
				channelId: joinData.channelId,
				userId: socket.user.id,
				socketId: socket.id,
			});
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
				message: filteredMessage,
			});
			return { res: true };
		} catch (error) {
			console.error("An error occurred in channel.gateway 'message':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'message'" });
			return { res: false };
		}
	}

	@SubscribeMessage('leave')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleLeave(@MessageBody() data, @ConnectedSocket() socket) {
		try {
			if ((await this.participantService.isParticipated(socket.user.id)) === false) {
				throw new Error('User is not a participant');
			}

			const participant = await this.participantService.get(socket.user.id);

			socket.to(participant.channelId).emit('leave', {
				message: `${socket.user.id} has left the channel`,
				profileImageURI: participant.userProfileImageURI,
			});
			socket.leave(participant.channelId);
			this.channelService.leaveChannel(socket.user.id);

			return { res: true };
		} catch (error) {
			console.error("An error occurred in channel.gateway 'leave':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'leave'" });
		}
	}

	@SubscribeMessage('role')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleRole(@MessageBody() data, @ConnectedSocket() socket) {
		try {
			if ((await this.participantService.isOwner(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}

			const newRole = plainToClass(ParticipantDto.Request.Update, data.role);
			const error = await validate(newRole);

			if (error.length > 0) {
				throw new Error('Failed validation: ' + JSON.stringify(error));
			}
			this.participantService.update(data.toUserId, newRole);

			return { res: true };
		} catch (error) {
			return { res: false, message: error };
		}
	}

	@SubscribeMessage('invite')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleInvite(
		@ConnectedSocket() socket: Socket,
		@MessageBody() inviteRequestDto: Dto.Request.Invite,
	) {
		try {
			if (!(await this.participantService.isParticipated(socket['user']['id']))) {
				throw new BadRequestException('User is not a participated');
			}

			const opponent = await this.userService.findByNickname(inviteRequestDto.nickname);
			if (!opponent || !(await this.participantService.isParticipated(opponent.id))) {
				throw new BadRequestException('Opponent not found');
			}
			return { status: 'SUCCESS' };
		} catch (error) {
			return { status: 'ERROR', message: error };
		}
	}

	@SubscribeMessage('mute')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleMute(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if ((await this.participantService.isAdmin(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}
			await this.muteService.muteUser(data.channelId, data.toUserId);

			this.server.to(data.channelId).emit('mute', {
				channelId: data.channelId,
				userId: data.toUserId,
				nickname: data.nickname,
			});
			return { res: true };
		} catch (error) {
			return { res: false, message: error };
		}
	}

	@SubscribeMessage('kick')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleKick(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if ((await this.participantService.isAdmin(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}
			await this.participantService.kick(socket.user.id);

			socket.leave(data.channelId);
			this.server.to(data.channelId).emit('kick', {
				channelId: data.channelId,
				userId: data.toUserId,
				nickname: data.nickname,
			});
			return { res: true };
		} catch (error) {
			return { res: false, message: error };
		}
	}

	@SubscribeMessage('ban')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleBan(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if ((await this.participantService.isAdmin(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}
			await this.participantService.kick(socket.user.id);
			await this.banService.create(data.channelId, socket.user.id);

			socket.leave(data.channelId);
			this.server.to(data.channelId).emit('ban', {
				channelId: data.channelId,
				userId: data.toUserId,
				nickname: data.nickname,
			});
			return { res: true };
		} catch (error) {
			return { res: false, message: error };
		}
	}
}

export default ChannelGateway;
