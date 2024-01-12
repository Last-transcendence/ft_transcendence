import { Injectable } from '@nestjs/common';
import { GameModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from './dto';

@Injectable()
class GameService {
	constructor(private readonly prismaService: PrismaService) {}

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
}

export default GameService;
