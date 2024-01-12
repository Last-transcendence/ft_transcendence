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

	async isBanned(channelId: string, userId: string): Promise<boolean> {
		try {
			const ban = await this.prismaService.ban.findUnique({
				where: {
					channelId_userId: {
						channelId,
						userId,
					},
				},
			});

			if (!ban) {
				return false;
			}
			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default BanService;
