import { Injectable } from '@nestjs/common';
import { GameModel } from 'common/model';
import { v1 as uuid } from 'uuid';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from './dto';

@Injectable()
class GameService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(): Promise<string> {
		try {
			return await uuid();
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getHistory(userId: string): Promise<GameModel[]> {
		try {
			return await this.prismaService.game.findMany({
				where: {
					player1Id: userId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getHistoryById(gameId: string): Promise<GameModel> {
		try {
			return await this.prismaService.game.findUnique({
				where: {
					id: gameId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getFirstHistory(player1Id: string, player2Id: string): Promise<GameModel> {
		try {
			return await this.prismaService.game.findFirst({
				where: {
					player1Id,
					player2Id,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createHistory(userId: string, createRequestDto: Dto.Request.Create): Promise<GameModel> {
		try {
			return await this.prismaService.game.create({
				data: {
					player1Id: userId,
					...createRequestDto,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateHistory(gameId: string, updateRequestDto: Dto.Request.Update): Promise<GameModel> {
		try {
			return await this.prismaService.game.update({
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
