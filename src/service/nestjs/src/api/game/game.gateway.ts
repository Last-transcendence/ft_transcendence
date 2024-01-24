import GameService from './game.service';
import { Namespace, Socket } from 'socket.io';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Auth from '../../common/auth';
import * as Dto from './dto';
import UserService from 'api/user/user.service';

const getCorsOrigin = () => {
	const configService = new ConfigService();

	return configService.getOrThrow('NEXTJS_URL');
};

@WebSocketGateway({
	namespace: '/socket/game',
	cors: { origin: getCorsOrigin(), credentials: true },
})
@UseGuards(Auth.Guard.UserWsJwt)
class GameGateway {
	constructor(
		private readonly gameService: GameService,
		private readonly userService: UserService,
	) {}

	@WebSocketServer()
	server: Namespace;

	handleConnection(socket: Socket) {
		try {
			//console.log('Client connected to game namespace');
			this.gameService.getBySocketId(socket.id).then(game => {
				if (game) {
					this.gameService.delete(game.id);
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	handleDisconnect(socket: Socket) {
		try {
			console.log('Client disconnected from game namespace');
			this.gameService.getBySocketId(socket.id).then(game => {
				if (game) {
					this.gameService.delete(game.id);
					this.gameService.deleteFirstHistory(game.userId);
					this.userService.online(game.userId);
				}
			});
			this.gameService.getByUserId(socket['user']['id']).then(game => {
				if (game) {
					this.gameService.delete(game.id);
					this.gameService.deleteFirstHistory(game.userId);
					this.userService.online(game.userId);
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	getRoom(room: string): Set<string> {
		return this.server.adapter.rooms.get(room);
	}

	getOpponentSocketId(socket: Socket, room: string): string {
		const opponentSocketId = Array.from(this.getRoom(room)).find(
			socketId => socketId !== socket.id,
		);
		if (!opponentSocketId) {
			throw new Error('Opponent socket id not found');
		}
		return opponentSocketId;
	}

	@SubscribeMessage('queue')
	async handleQueueEvent(@ConnectedSocket() socket: Socket) {
		try {
			socket.join('queue');
			this.userService.playing(socket['user']['id']);

			const clients = Array.from(this.getRoom('queue'));
			if (clients.length === 1) {
				return;
			}

			const player1 = clients[0];
			const player2 = clients[1];

			await this.gameService.create({ socketId: player1, mode: 'HARD' });
			await this.gameService.create({ socketId: player2, mode: 'HARD' });

			const socket1 = this.server.sockets.get(player1);
			const socket2 = this.server.sockets.get(player2);
			const gameRoomId = await this.gameService.createRoom();

			socket1.leave('queue');
			socket2.leave('queue');

			socket1.join(gameRoomId);
			socket2.join(gameRoomId);

			this.server.to(player1).emit('matched', { room: gameRoomId });
			this.server.to(player2).emit('matched', { room: gameRoomId });

			return { status: 'SUCCESS' };
		} catch (error) {
			return {
				message: error.message,
				status: error.status,
			};
		}
	}

	@SubscribeMessage('connected')
	async handleConnectedEvent(
		@ConnectedSocket() socket: Socket,
		@MessageBody() connectedRequestDto: Dto.Request.Connected,
	) {
		let game = await this.gameService.getBySocketId(socket.id);

		try {
			if (!game.userId) {
				await this.gameService.deleteByUserId(socket['user']['id']);
				game = await this.gameService.update(game.id, { userId: socket['user']['id'] });
			}
			await this.gameService.update(game.id, { updatedAt: new Date() });

			const opponentSocketId = this.getOpponentSocketId(socket, connectedRequestDto.room);
			const opponentGame = await this.gameService.getBySocketId(opponentSocketId);

			void opponentGame;

			return { status: 'SUCCESS' };
		} catch (error) {
			this.server.to(socket.id).emit('end', {
				state: 'DISCONNECTED',
			});
			this.gameService.delete(game.id);
			this.gameService.deleteFirstHistory(game.userId);
			this.userService.online(game.userId);

			return { status: 'DISCONNECTED' };
		}
	}

	@SubscribeMessage('ready')
	async handleReadyEvent(
		@ConnectedSocket() socket: Socket,
		@MessageBody() readyRequestDto: Dto.Request.Ready,
	) {
		try {
			let game = await this.gameService.getBySocketId(socket.id);
			if (!game.ready) {
				game = await this.gameService.update(game.id, { ready: true });
			}

			const opponentSocketId = this.getOpponentSocketId(socket, readyRequestDto.room);
			const opponentGame = await this.gameService.getBySocketId(opponentSocketId);
			if (!opponentGame.ready) {
				return;
			}

			this.gameService.update(game.id, { ready: false });
			this.gameService.update(opponentGame.id, { ready: false });

			const speed = game.mode === 'NORMAL' ? 0.15 : 0.3;
			const randomX =
				(Math.random() < 0.5 ? Math.random() * 600 + 150 : Math.random() * -600 - 150) * speed;
			const randomY =
				(Math.random() < 0.5 ? 1280 - Math.abs(randomX) : Math.abs(randomX) - 1280) * speed;

			this.server.to(socket.id).emit('start', { ball: { velocityX: randomX, velocityY: randomY } });
			this.server
				.to(opponentSocketId)
				.emit('start', { ball: { velocityX: -randomX, velocityY: -randomY } });

			return { status: 'SUCCESS' };
		} catch (error) {
			return {
				message: error.message,
				status: error.status,
			};
		}
	}

	@SubscribeMessage('move')
	async handleMoveEvent(
		@ConnectedSocket() socket: Socket,
		@MessageBody() moveRequestDto: Dto.Request.Move,
	) {
		try {
			const opponentSocketId = this.getOpponentSocketId(socket, moveRequestDto.room);

			this.server.to(opponentSocketId).emit('move', moveRequestDto);

			return { status: 'SUCCESS' };
		} catch (error) {
			return {
				message: error.message,
				status: error.status,
			};
		}
	}

	@SubscribeMessage('score')
	async handleScoreEvent(
		@ConnectedSocket() socket: Socket,
		@MessageBody() scoreRequestDto: Dto.Request.Score,
	) {
		try {
			const opponentSocketId = this.getOpponentSocketId(socket, scoreRequestDto.room);
			const game = await this.gameService.getBySocketId(socket.id);
			const opponentGame = await this.gameService.getBySocketId(opponentSocketId);
			const me = await this.userService.get(socket['user']['id']);
			const opponent = await this.userService.get(opponentGame.userId);

			// socket
			{
				this.server.to(opponentSocketId).emit('score', scoreRequestDto);

				if (scoreRequestDto.state !== 'confirmed') {
					return { status: 'PENDING' };
				}

				if (parseInt(scoreRequestDto.score) === 4) {
					this.server.sockets.get(socket.id).leave(scoreRequestDto.room);
					this.server.sockets.get(opponentSocketId).leave(scoreRequestDto.room);
					this.server.to(socket.id).emit('end', {
						state: 'RESULT',
						me: {
							nickname: me.nickname,
							profileImageURI: me.profileImageURI,
						},
						opponent: {
							nickname: opponent.nickname,
							profileImageURI: opponent.profileImageURI,
						},
					});
					this.server.to(opponentSocketId).emit('end', {
						state: 'RESULT',
						me: {
							nickname: opponent.nickname,
							profileImageURI: opponent.profileImageURI,
						},
						opponent: {
							nickname: me.nickname,
							profileImageURI: me.profileImageURI,
						},
					});
				}
			}

			// database
			{
				let player1History = await this.gameService.getFirstHistory(game.id);
				if (!player1History || player1History.result !== 'PENDING') {
					player1History = await this.gameService.createHistory(game.id, {
						player1Id: game.userId,
						player2Id: opponentGame.userId,
						mode: game.mode,
						player1Score: parseInt(scoreRequestDto.score),
						player2Score: 0,
						result: 'PENDING',
					});
					console.log('player1 history', player1History);
				} else {
					this.gameService.updateHistory(player1History.id, {
						player1Score: parseInt(scoreRequestDto.score),
					});
				}

				let player2History = await this.gameService.getFirstHistory(game.id);
				if (!player2History || player2History.result !== 'PENDING') {
					player2History = await this.gameService.createHistory(game.id, {
						player1Id: opponentGame.userId,
						player2Id: game.userId,
						mode: game.mode,
						player1Score: 0,
						player2Score: parseInt(scoreRequestDto.score),
						result: 'PENDING',
					});
				} else {
					this.gameService.updateHistory(player2History.id, {
						player2Score: parseInt(scoreRequestDto.score),
					});
				}
				if (parseInt(scoreRequestDto.score) === 4) {
					this.gameService.updateHistory(player1History.id, {
						result: 'WIN',
					});
					this.gameService.updateHistory(player2History.id, {
						result: 'LOSE',
					});
					this.gameService.delete(game.id);
					this.gameService.delete(opponentGame.id);
					this.userService.online(me.id);
					this.userService.online(opponent.id);
				}
			}

			return { status: 'SUCCESS' };
		} catch (error) {
			return {
				message: error.message,
				status: error.status,
			};
		}
	}
}

export default GameGateway;
