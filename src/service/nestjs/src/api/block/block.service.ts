import { Injectable } from '@nestjs/common';
import { BlockModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class BlockService {
	constructor(private readonly prismaService: PrismaService) {}

	async get(userId: string): Promise<BlockModel[]> {
		try {
			return await this.prismaService.block.findMany({ where: { userId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(userId: string, blockedId: string): Promise<BlockModel> {
		try {
			return await this.prismaService.block.create({ data: { userId, blockedId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async find(userId: string, destId: string): Promise<BlockModel> {
		try {
			return await this.prismaService.block.findFirst({ where: { userId: userId, blockedId: destId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async delete(userId: string, blockedId: string): Promise<void> {
		try {
			const block = await this.prismaService.block.findFirst({ where: { userId, blockedId } });
			if (!block) {
				return null;
			}

			await this.prismaService.block.delete({ where: { id: block.id } });
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default BlockService;
