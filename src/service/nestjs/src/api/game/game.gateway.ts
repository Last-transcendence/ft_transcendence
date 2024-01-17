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
import * as Auth from '../../common/auth';
import * as Dto from './dto';

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
	constructor(private readonly gameService: GameService) {}

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

			// get clients list of queue
			const clients = this.getRoom('queue');

			if (clients.size === 1) {
				const gameId = await this.gameService.create();

				socket.leave('queue');
				socket.join(gameId);
				this.getRoom(gameId).add(JSON.stringify({ mode: 'hard' }));
				return this.server.to(socket.id).emit('matched', { id: gameId });
				return;
			}

			const player1 = Array.from(clients)[0];
			const player2 = Array.from(clients)[1];
			const gameId = await this.gameService.create();
			const socket1 = this.server.sockets.get(player1);
			const socket2 = this.server.sockets.get(player2);
			const gameRoom = this.getRoom(gameId);

			socket1.leave('queue');
			socket2.leave('queue');

			socket1.join(gameId);
			socket2.join(gameId);

			gameRoom.add(JSON.stringify({ mode: 'hard' }));

			this.server.to(player1).emit('matched', { id: gameId });
			this.server.to(player2).emit('matched', { id: gameId });
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@SubscribeMessage('ready')
	async handleReadyEvent(@MessageBody() readyRequestDto: Dto.Request.Ready) {
		try {
			const room = Array.from(this.getRoom(readyRequestDto.room));
			const mode = JSON.parse(room[room.length - 1]).mode;
			const speed = mode === 'NORMAL' ? 0.25 : 0.5;
			const randomX =
				(Math.random() < 0.5 ? Math.random() * 600 + 150 : Math.random() * -600 - 150) * speed;
			const randomY =
				(Math.random() < 0.5 ? 1280 - Math.abs(randomX) : Math.abs(randomX) - 1280) * speed;
			return this.server
				.to(Array.from(room)[0])
				.emit('start', { ball: { x: randomX, y: randomY } });
			if (room.length !== 3) {
				return;
			}

			const player1 = room[0];
			const player2 = room[1];

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
			const opponentSocketId = this.getOpponentSocketId(socket, scoreRequestDto.room);

			this.server.to(opponentSocketId).emit('score', scoreRequestDto);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default GameGateway;
