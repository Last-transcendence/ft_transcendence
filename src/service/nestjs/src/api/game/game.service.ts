import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import PrismaService from 'common/prisma/prisma.service';
import { GameModel, GameHistoryModel } from 'common/model';
import * as Dto from './dto';

@Injectable()
class GameService {
	constructor(private readonly prismaService: PrismaService) {}

	async getBySocketId(socketId: string): Promise<GameModel> {
		try {
			return await this.prismaService.game.findUnique({
				where: {
					socketId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(createRequestDto: Dto.Request.Create): Promise<GameModel> {
		try {
			return await this.prismaService.game.create({
				data: {
					...createRequestDto,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async update(id: string, updateRequestDto: Dto.Request.Update): Promise<GameModel> {
		try {
			return await this.prismaService.game.update({
				where: { id },
				data: { ...updateRequestDto },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async delete(id: string): Promise<GameModel> {
		try {
			return await this.prismaService.game.delete({
				where: { id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createRoom(): Promise<string> {
		try {
			return await uuid();
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getHistory(userId: string): Promise<GameHistoryModel[]> {
		try {
			return await this.prismaService.gameHistory.findMany({
				where: {
					player1Id: userId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getHistoryById(gameId: string): Promise<GameHistoryModel> {
		try {
			return await this.prismaService.gameHistory.findUnique({
				where: {
					id: gameId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getFirstHistory(player1Id: string, player2Id: string): Promise<GameHistoryModel> {
		try {
			return await this.prismaService.gameHistory.findFirst({
				where: {
					player1Id,
					player2Id,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createHistory(
		userId: string,
		createRequestDto: Dto.Request.CreateHistory,
	): Promise<GameHistoryModel> {
		try {
			return await this.prismaService.gameHistory.create({
				data: {
					player1Id: userId,
					...createRequestDto,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateHistory(
		gameId: string,
		updateRequestDto: Dto.Request.UpdateHistory,
	): Promise<GameHistoryModel> {
		try {
			return await this.prismaService.gameHistory.update({
				where: {
					id: gameId,
				},
				data: {
					...updateRequestDto,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default GameService;
