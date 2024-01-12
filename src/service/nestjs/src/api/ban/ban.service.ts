import { Injectable } from '@nestjs/common';
import { BanModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class BanService {
	constructor(private readonly prismaService: PrismaService) {}

	async get(userId: string): Promise<BanModel[]> {
		try {
			return await this.prismaService.ban.findMany({
				where: {
					userId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(channelId: string, userId: string): Promise<BanModel> {
		try {
			return await this.prismaService.ban.create({
				data: {
					channelId,
					userId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default BanService;
