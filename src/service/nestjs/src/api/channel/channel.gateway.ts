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
import GameService from 'api/game/game.service';
import MuteService from 'api/mute/mute.service';
import ParticipantService from 'api/participant/participant.service';
import UserService from 'api/user/user.service';
import { Namespace, Socket } from 'socket.io';
import * as Auth from '../../common/auth';
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
@UseGuards(Auth.Guard.UserWsJwt)
class ChannelGateway {
	constructor(
		private readonly channelService: ChannelService,
		@Inject(forwardRef(() => ParticipantService))
		private readonly participantService: ParticipantService,
		@Inject(forwardRef(() => BanService)) private readonly banService: BanService,
		private readonly userService: UserService,
		private readonly muteService: MuteService,
		private readonly gameService: GameService,
	) {}

	@WebSocketServer()
	server: Namespace;

	handleConnection() {
		console.log('Client connected to channel namespace');
	}

	handleDisconnect(@ConnectedSocket() socket) {
		try {
			this.channelService.deleteEmptyChannel();
		} catch (error) {
			console.error("An error occurred in channel.gateway 'handleDisconnect':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'handleDisconnect'" });
		}
	}

	@SubscribeMessage('create')
	async handleCreate(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			await this.channelService.leaveChannel(socket, socket.user.id);

			const newChannel = await this.channelService.createChannel(data);
			await this.participantService.create({
				channelId: newChannel.id,
				userId: socket.user.id,
				socketId: socket.id,
				role: 'OWNER',
			});

			socket.join(newChannel.id);

			return { res: true, channelId: newChannel.id };
		} catch (error) {
			console.error("An error occurred channel.gateway 'create':", error);
			socket.emit('error', { message: "An error occurred channel.gateway 'create'" });
			return { res: false };
		}
	}

	@SubscribeMessage('join')
	async handleJoin(@MessageBody() joinData, @ConnectedSocket() socket) {
		try {
			const userId = socket.user.id;

			const channel = await this.channelService.getChannel(joinData.channelId);
			if (!channel) {
				throw new BadRequestException('Channel not found');
			}
			if (await this.banService.isBanned(channel.id, userId)) {
				throw new BadRequestException('User is banned');
			}
			if (
				channel.visibility === 'PROTECTED' &&
				!(await this.channelService.validatePassword(channel.id, joinData.password))
			) {
				throw new BadRequestException('Wrong password');
			}

			let participant = await this.participantService.getByUserId(userId);
			if (participant) {
				socket.leave(participant.channelId);
				participant = await this.participantService.update(participant.id, {
					channelId: channel.id,
					socketId: socket.id,
					role: 'USER',
				});
			} else {
				participant = await this.participantService.create({
					channelId: channel.id,
					userId,
					socketId: socket.id,
				});
			}

			this.server.to(participant.channelId).emit('join', {
				userId,
				nickname: socket.user.nickname,
				profileImageURI: socket.user.profileImageURI,
			});

			socket.join(participant.channelId);

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
			const channel = await this.channelService.getChannel(data.channelId);
			if (!channel) {
				throw new BadRequestException('Channel not found');
			}
			if (
				data.visibility === 'PROTECTED' &&
				(!data.password || data.password.length !== 6 || !/^\d+$/.test(data.password))
			) {
				throw new BadRequestException('Password error');
			}
			if (data.title.length > 30) {
				throw new BadRequestException('Title must be less than 30 characters');
			}
			if (!data.title) {
				data.title = channel.title;
			}
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
			const filteredMessage = await this.channelService.messageFilter(
				data.channelId,
				data.userId,
				data.message,
			);

			if (await this.muteService.isMuted(data.channelId, data.userId)) {
				throw new Error('User is muted');
			}

			this.server.to(data.channelId).emit('message', {
				userId: data.userId,
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

			const channel = await this.channelService.getChannel(data.channelId);
			if (!channel) {
				throw new Error('Channel not found');
			}

			let participant = await this.participantService.getByUserId(socket.user.id);
			if (!participant) {
				throw new Error('Participant not found');
			}

			participant = await this.channelService.leaveChannel(socket, socket.user.id);

			socket.to(participant.channelId).emit('leave', {
				channelId: participant.channelId,
				userId: socket.user.id,
				nickname: socket.user.nickname,
			});

			const participants = await this.channelService.getParticipants(channel.id);
			if (!participants.length) {
				this.channelService.deleteEmptyChannel();
			} else {
				if (participant.role === 'OWNER') {
					const admins = participants.filter(participant => participant.role === 'ADMIN').reverse();
					if (!admins.length) {
						const users = participants.filter(participant => participant.role === 'USER').reverse();

						this.participantService.update(users[0].id, { role: 'OWNER' });
					} else {
						this.participantService.update(admins[0].id, { role: 'OWNER' });
					}
				}
			}

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

			const channel = await this.channelService.getChannel(data.channelId);
			if (!channel) {
				throw new Error('Channel not found');
			}

			let participant = await this.participantService.getByUserId(data.toUserId);
			if (!participant) {
				throw new Error('Participant not found');
			}

			participant = await this.participantService.update(participant.id, {
				socketId: participant.socketId,
				role: data.role,
			});
			if (!participant) {
				throw new Error('Fail to update role');
			}

			this.server
				.to(participant.channelId)
				.emit('role', { userId: participant.userId, nickname: participant.nickname });
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
			console.log(inviteRequestDto);
			if (!(await this.participantService.isParticipated(socket['user']['id']))) {
				throw new BadRequestException('User is not participated');
			}

			const participant = await this.participantService.getByUserId(socket['user']['id']);
			if (!participant) {
				throw new BadRequestException('Participant not found');
			}

			const opponent = await this.userService.findByNickname(inviteRequestDto.nickname);
			if (!opponent || !(await this.participantService.isParticipated(opponent.id))) {
				throw new BadRequestException('Opponent not found');
			}

			const opponentParticipant = await this.participantService.getByUserId(opponent.id);

			this.server.to(opponentParticipant.socketId).emit('invite', {
				channelId: inviteRequestDto.channelId,
				userId: socket['user']['id'],
				nickname: socket['user']['nickname'],
				mode: inviteRequestDto.mode,
			});

			return { status: 'SUCCESS' };
		} catch (error) {
			return {
				message: error.message,
				status: error.status,
			};
		}
	}

	@SubscribeMessage('invite/response')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleInviteResponse(
		@ConnectedSocket() socket: Socket,
		@MessageBody() inviteResponseRequestDto: Dto.Request.InviteResponse,
	) {
		try {
			if (inviteResponseRequestDto.response === 'REJECT') {
				return { status: 'SUCCESS' };
			}

			if (!(await this.participantService.isParticipated(socket['user']['id']))) {
				throw new BadRequestException('User is not participated');
			}

			const opponent = await this.userService.get(inviteResponseRequestDto.userId);
			if (!opponent || !(await this.participantService.isParticipated(opponent.id))) {
				throw new BadRequestException('Opponent not found');
			}

			const participant = await this.participantService.getByUserId(socket['user']['id']);
			const opponentParticipant = await this.participantService.getByUserId(opponent.id);

			await this.gameService.create({
				socketId: participant.socketId,
				mode: inviteResponseRequestDto.mode,
			});
			await this.gameService.create({
				socketId: opponentParticipant.socketId,
				mode: inviteResponseRequestDto.mode,
			});

			// game play 중이면 channel에서 leave?
			const socket1 = this.server.sockets.get(participant.socketId);
			const socket2 = this.server.sockets.get(opponentParticipant.socketId);
			const gameRoomId = await this.gameService.createRoom();

			socket1.join(gameRoomId);
			socket2.join(gameRoomId);

			// event 명 무엇으로 할지 고민
			this.server.to(participant.socketId).emit('invite/matched', { room: gameRoomId });
			this.server.to(opponentParticipant.socketId).emit('invite/matched', { room: gameRoomId });

			return { status: 'SUCCESS' };
		} catch (error) {
			return {
				message: error.message,
				status: error.status,
			};
		}
	}

	@SubscribeMessage('mute')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleMute(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if ((await this.participantService.isAuthorized(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}
			if ((await this.participantService.isOwner(data.toUserId)) === true) {
				throw new Error('Cannot mute owner');
			}

			const channel = await this.channelService.getChannel(data.channelId);
			if (!channel) {
				throw new Error('Channel not found');
			}

			const participant = await this.participantService.getByUserId(data.toUserId);
			if (!participant) {
				throw new Error('Participant not found');
			}

			const mute = await this.muteService.muteUser(channel.id, participant.userId);
			if (!mute) {
				throw new Error('Fail to mute');
			}

			this.server.to(data.channelId).emit('mute', {
				channelId: data.channelId,
				userId: data.toUserId,
				nickname: data.nickname,
			});

			return { res: true };
		} catch (error) {
			console.error("An error occurred in channel.gateway 'mute':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'mute'" });
			return { res: false, message: error };
		}
	}

	@SubscribeMessage('kick')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleKick(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if ((await this.participantService.isAuthorized(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}
			if ((await this.participantService.isOwner(data.toUserId)) === true) {
				throw new Error('Owner cannot perform this action');
			}

			const channel = await this.channelService.getChannel(data.channelId);
			if (!channel) {
				throw new Error('Channel not found');
			}

			let participant = await this.participantService.getByUserId(data.toUserId);
			if (!participant) {
				throw new Error('Participant not found');
			}

			this.server.to(channel.id).emit('kick', {
				channelId: channel.id,
				userId: participant.userId,
				nickname: participant.nickname,
			});

			participant = await this.participantService.kick(participant.id);
			if (participant && participant?.socketId) {
				this.server.sockets.get(participant.socketId).leave(channel.id);
			}

			return { res: true };
		} catch (error) {
			console.error('An error occurred in channel.gateway:', error);
			socket.emit('error', { message: 'An error occurred in channel.gateway' });
			return { res: false, message: error };
		}
	}

	@SubscribeMessage('ban')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleBan(@ConnectedSocket() socket, @MessageBody() data) {
		try {
			if ((await this.participantService.isAuthorized(socket.user.id)) === false) {
				throw new Error('Permission denied');
			}
			if ((await this.participantService.isOwner(data.toUserId)) === true) {
				throw new Error('Owner cannot perform this action');
			}

			const channel = await this.channelService.getChannel(data.channelId);
			if (!channel) {
				throw new Error('Channel not found');
			}

			let participant = await this.participantService.getByUserId(data.toUserId);
			if (!participant) {
				throw new Error('Participant not found');
			}

			this.server.to(channel.id).emit('ban', {
				channelId: channel.id,
				userId: participant.userId,
				nickname: participant.nickname,
			});

			participant = await this.participantService.kick(participant.id);

			if ((await this.banService.isBanned(channel.id, participant.userId)) === false) {
				this.banService.create(channel.id, participant.userId);
			}

			if (participant && participant?.socketId) {
				this.server.sockets.get(participant.socketId).leave(channel.id);
			}

			return { res: true };
		} catch (error) {
			console.error('An error occurred in handleBan:', error);
			socket.emit('error', { message: 'An error occurred in handleBan' });
			return { res: false, message: error };
		}
	}
}

export default ChannelGateway;
