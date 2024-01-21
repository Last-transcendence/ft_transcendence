import GameService from './game.service';
import { Namespace, Socket } from 'socket.io';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { HttpException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { $Enums } from '@prisma/client';
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

	handleConnection() {
		//console.log('Client connected to game namespace');
	}

	getRoom(room: string): Set<string> {
		return this.server.adapter.rooms.get(room);
	}

	getOpponentSocketId(socket: Socket, room: string): string {
		return Array.from(this.getRoom(room)).find(client => client !== socket.id);
	}

	@SubscribeMessage('queue')
	async handleQueueEvent(@ConnectedSocket() socket: Socket) {
		try {
			socket.join('queue');

			//this.userService.updateUserById(socket['user']['id'], {
			//	status: 'ONLINE',
			//});

			const clients = Array.from(this.getRoom('queue'));

			if (clients.length === 1) {
				return;
			}

			const player1 = clients[0];
			const player2 = clients[1];
			const socket1 = this.server.sockets.get(player1);
			const socket2 = this.server.sockets.get(player2);
			const gameId = await this.gameService.create();

			socket1.leave('queue');
			socket2.leave('queue');

			socket1.join(gameId);
			socket2.join(gameId);

			const gameRoom = this.getRoom(gameId);
			const mode: $Enums.GameMode = 'HARD';

			gameRoom.add(JSON.stringify({ mode, user: [], ready: [] }));

			this.server.to(player1).emit('matched', { room: gameId });
			this.server.to(player2).emit('matched', { room: gameId });
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@SubscribeMessage('ready')
	async handleReadyEvent(
		@ConnectedSocket() socket: Socket,
		@MessageBody() readyRequestDto: Dto.Request.Ready,
	) {
		try {
			const room = this.getRoom(readyRequestDto.room);
			const mode: $Enums.GameMode = JSON.parse(Array.from(room)[2]).mode;
			const user = JSON.parse(Array.from(room)[2]).user;
			const ready = JSON.parse(Array.from(room)[2]).ready;
			if (ready.includes(socket.id)) {
				return;
			}
			user.push(socket['user']);
			ready.push(socket.id);
			room.delete(Array.from(room)[2]);
			room.add(JSON.stringify({ mode, user, ready }));
			if (ready.length !== 2) {
				return;
			}
			room.delete(Array.from(room)[2]);
			room.add(JSON.stringify({ mode, user, ready: [] }));

			const speed = mode === 'NORMAL' ? 0.15 : 0.3;
			const randomX =
				(Math.random() < 0.5 ? Math.random() * 600 + 150 : Math.random() * -600 - 150) * speed;
			const randomY =
				(Math.random() < 0.5 ? 1280 - Math.abs(randomX) : Math.abs(randomX) - 1280) * speed;
			//return this.server
			//	.to(Array.from(room)[0])
			//	.emit('start', { ball: { x: randomX, y: randomY } });

			const player1 = Array.from(room)[0];
			const player2 = Array.from(room)[1];

			this.server.to(player1).emit('start', { ball: { x: randomX, y: randomY } });
			this.server.to(player2).emit('start', { ball: { x: -randomX, y: -randomY } });
		} catch (error) {
			throw new HttpException(error.message, error.status);
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
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@SubscribeMessage('score')
	async handleScoreEvent(
		@ConnectedSocket() socket: Socket,
		@MessageBody() scoreRequestDto: Dto.Request.Score,
	) {
		try {
			const room = Array.from(this.getRoom(scoreRequestDto.room));
			const user = JSON.parse(room[2]).user;
			const player1 = user.find(user => user.id === socket['user']['id']);
			const player2 = user.find(user => user.id !== socket['user']['id']);

			// socket
			{
				const opponentSocketId = this.getOpponentSocketId(socket, scoreRequestDto.room);

				this.server.to(opponentSocketId).emit('score', scoreRequestDto);

				if (parseInt(scoreRequestDto.score) === 4) {
					this.server.sockets.get(room[0]).leave(scoreRequestDto.room);
					this.server.sockets.get(room[1]).leave(scoreRequestDto.room);
					this.server.to(socket.id).emit('end', {
						me: {
							nickname: player1.nickname,
							profileImageURI: player1.profileImageURI,
						},
						opponent: {
							nickname: player2.nickname,
							profileImageURI: player2.profileImageURI,
						},
					});
					this.server.to(opponentSocketId).emit('end', {
						me: {
							nickname: player2.nickname,
							profileImageURI: player2.profileImageURI,
						},
						opponent: {
							nickname: player1.nickname,
							profileImageURI: player1.profileImageURI,
						},
					});
				}
			}

			// database
			{
				const mode: $Enums.GameMode = JSON.parse(room[2]).mode;
				const player1Id = player1.id;
				const player2Id = player2.id;
				let player1History = await this.gameService.getFirstHistory(player1Id, player2Id);
				let player2History = await this.gameService.getFirstHistory(player2Id, player1Id);

				if (!player1History && !player2History) {
					player1History = await this.gameService.createHistory(player1Id, {
						player2Id,
						mode,
						player1Score: parseInt(scoreRequestDto.score),
						player2Score: 0,
						result: 'PENDING',
					});
					player2History = await this.gameService.createHistory(player2Id, {
						player2Id: player1Id,
						mode,
						player1Score: 0,
						player2Score: parseInt(scoreRequestDto.score),
						result: 'PENDING',
					});
				} else {
					this.gameService.updateHistory(player1History.id, {
						player1Score: parseInt(scoreRequestDto.score),
					});
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
					//this.userService.updateUserById(player1Id, {
					//	status: 'ONLINE',
					//});
					//this.userService.updateUserById(player2Id, {
					//	status: 'ONLINE',
					//});
				}
			}
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default GameGateway;
