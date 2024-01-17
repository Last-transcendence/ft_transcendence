import GameService from './game.service';
import { Server, Socket } from 'socket.io';
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
	server: Server;

	handleConnection() {
		console.log('Client connected to game namespace');
	}

	getClients(room: string): Set<string> {
		return this.server.adapter['rooms'].get(room);
	}

	getOpponentSocketId(socket: Socket, room: string): string {
		return Array.from(this.getClients(room)).find(client => client !== socket.id);
	}

	@SubscribeMessage('/queue/join')
	async handleQueueEvent(@ConnectedSocket() socket: Socket) {
		try {
			socket.join('queue');

			// get clients list of queue
			const clients = this.getClients('queue');
			return this.server.to(Array.from(clients)[0]).emit('matched', { id: 'test' });
			if (clients.size === 1) {
				return;
			}

			// pop first two clients from queue
			const player1 = Array.from(clients)[0];
			const player2 = Array.from(clients)[1];

			// create game
			const game = await this.gameService.create();

			// send game to clients
			this.server.to(player1).emit('matched', { id: game });
			this.server.to(player2).emit('matched', { id: game });
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@SubscribeMessage('/queue/leave')
	async handleLeaveQueueEvent(@ConnectedSocket() socket: Socket) {
		try {
			socket.leave('queue');
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
			socket.join(readyRequestDto.room);

			const clients = this.getClients(readyRequestDto.room);
			const randomX = Math.random() < 0.5 ? Math.random() * 600 + 150 : Math.random() * -600 - 150;
			const randomY = Math.random() < 0.5 ? 1280 - Math.abs(randomX) : Math.abs(randomX) - 1280;
			return this.server
				.to(Array.from(clients)[0])
				.emit('start', { ball: { x: randomX, y: randomY } });
			if (clients.size !== 2) {
				return;
			}

			const player1 = Array.from(clients)[0];
			const player2 = Array.from(clients)[1];

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
