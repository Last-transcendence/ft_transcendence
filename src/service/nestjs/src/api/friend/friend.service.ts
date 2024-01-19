import { Injectable } from '@nestjs/common';
import { FriendModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from './dto';

@Injectable()
class FriendService {
	constructor(private readonly prismaService: PrismaService) {}

	async getFriend(userId: string): Promise<Dto.Response.Get[]> {
		try {
			// search friends with userId and concat user information of friend
			const friends = await this.prismaService.friend.findMany({
				where: { userId },
				select: { friendId: true },
			});

			return await Promise.all(
				friends.map(async friend => {
					const user = await this.prismaService.user.findUnique({
						where: { id: friend.friendId },
						select: { id: true, nickname: true, profileImageURI: true, status: true },
					});

					return { ...user, friendId: friend.friendId };
				}),
			);
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
