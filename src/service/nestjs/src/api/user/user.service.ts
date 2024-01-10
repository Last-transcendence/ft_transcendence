import { HttpException, Injectable } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserById(id: string) {
		try {
			const user = await this.prismaService.user.findUnique({ where: { id } });

			if (!user) {
				throw new HttpException('User not found', 404);
			}
			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getUserByIntraId(intraId: string) {
		try {
			const user = await this.prismaService.user.findUnique({ where: { intraId } });
			return user;
		} catch (error) {
			if (error.status === 404) {
				throw new HttpException('User not found', 404);
			}
			throw new Error(error.message);
		}
	}

	async findByIntraId(intraId: string): Promise<User> {
		const foundUser = await this.prismaService.user.findFirst({ where: { intraId } });
		if (foundUser) {
			return foundUser;
		}
		return null;
	}

	async findByNickName(nickname: string): Promise<User> {
		const foundNick = await this.prismaService.user.findFirst({ where: { nickname } });
		if (foundNick) {
			return foundNick;
		}
		return null;
	}

	async createByIntraId(intraId: string, use2fa: boolean, nickname?: string, profileImageURI?: string): Promise<User>{
		try {
			return this.prismaService.user.create({ data: { intraId, nickname, profileImageURI, use2fa } });
		} catch (error) {
			throw new Error(error.message);
		}
	}
	//partial<Dto.Request.User>
	async updateUserById(id: string, _user: Partial<User>) {
		try {
			await this.prismaService.user.update({ where: { id }, data: _user });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async setProfileImage(id: string, profileImageURI: string) {
		try {
			await this.prismaService.user.update({ where: { id }, data: { profileImageURI } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateUserImagebyIntraId(intraId: string, profileImageURI: string) {
		try {
			await this.prismaService.user.update({ where: { intraId }, data: { profileImageURI } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async searchUserByNickname(nickname: string) {
		try {
			return await this.prismaService.user.findMany({ where: { nickname } });
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default UserService;
