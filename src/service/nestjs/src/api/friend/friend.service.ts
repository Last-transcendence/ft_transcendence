import { Injectable } from '@nestjs/common';
import { FriendModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class FriendService {
	constructor(private readonly prismaService: PrismaService) {}

	async getFriend(userId: string): Promise<FriendModel[]> {
		try {
			return await this.prismaService.friend.findMany({ where: { userId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createFriend(userId: string, friendId: string): Promise<FriendModel> {
		try {
			return await this.prismaService.friend.create({
				data: { userId, friendId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteFriend(userId: string, friendId: string): Promise<FriendModel> {
		try {
			return await this.prismaService.friend.delete({
				where: { userId_friendId: { userId, friendId } },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default FriendService;
