import { Injectable } from '@nestjs/common';
import { BlockModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class BlockService {
	constructor(private readonly prismaService: PrismaService) {}

	async getBlock(userId: string): Promise<BlockModel[]> {
		try {
			return await this.prismaService.block.findMany({ where: { userId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async blockUser(userId: string, blockedId: string): Promise<BlockModel> {
		try {
			return await this.prismaService.block.create({ data: { userId, blockedId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default BlockService;
