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
			return await this.prismaService.game.findFirst({
				where: {
					socketId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getByUserId(userId: string): Promise<GameModel> {
		try {
			const game = await this.prismaService.game.findFirst({
				where: { userId },
			});
			if (!game) {
				return null;
			}

			return game;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(createRequestDto: Dto.Request.Create): Promise<GameModel> {
		try {
			if (createRequestDto?.userId) {
				await this.prismaService.game.deleteMany({
					where: { userId: createRequestDto.userId },
				});
			}
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
			const game = await this.prismaService.game.findFirst({
				where: { id },
			});
			if (!game) {
				return null;
			}

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
			const game = await this.prismaService.game.findFirst({
				where: { id },
			});
			if (!game) {
				return null;
			}

			return await this.prismaService.game.delete({
				where: { id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteByUserId(userId: string): Promise<void> {
		try {
			await this.prismaService.game.deleteMany({
				where: { userId },
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
			const histories = await this.prismaService.gameHistory.findMany({
				where: {
					player1Id: userId,
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			return histories.filter(history => history.result !== 'PENDING');
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

	async getFirstHistory(gameId: string, player1Id: string): Promise<GameHistoryModel> {
		try {
			return await this.prismaService.gameHistory.findFirst({
				where: { gameId, player1Id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createHistory(
		gameId: string,
		createRequestDto: Dto.Request.CreateHistory,
	): Promise<GameHistoryModel> {
		try {
			return await this.prismaService.gameHistory.create({
				data: {
					gameId,
					...createRequestDto,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateHistory(
		id: string,
		updateRequestDto: Dto.Request.UpdateHistory,
	): Promise<GameHistoryModel> {
		try {
			const history = await this.prismaService.gameHistory.findFirst({
				where: { id },
			});
			if (!history) {
				return null;
			}

			return await this.prismaService.gameHistory.update({
				where: { id },
				data: { ...updateRequestDto },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteFirstHistory(gameId: string, player1Id: string): Promise<GameHistoryModel> {
		try {
			const history = await this.prismaService.gameHistory.findFirst({
				where: { gameId, player1Id },
			});
			if (!history) {
				return null;
			}

			return await this.prismaService.gameHistory.delete({
				where: { id: history.id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default GameService;
