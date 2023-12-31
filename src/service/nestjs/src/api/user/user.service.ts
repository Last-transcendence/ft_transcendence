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

	async getUserByintraId(intraId: string) {
		try {
			const user = await this.prismaService.user.findUnique({ where: { intraId } });
			if (!user) {
				throw new HttpException('User not found', 404);
			}
			return user;
		} catch (error) {
			if (error.status === 404) {
				throw new HttpException('User not found', 404);
			}
			throw new Error(error.message);
		}
	}

	async findByintraId(intraId: string): Promise<User> {
		const foundUser = await this.prismaService.user.findUnique({ where: { intraId } });
		if (foundUser) {
			return foundUser;
		}
		return null;
	}

	async createByintraId(user: User): Promise<User>{
		try {
			return this.prismaService.user.create({ data: user });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateUserById(id: string, _user: User) {
		try {
			// const user = await this.prismaService.user.findUnique({ where: { id } });

			// if (!user) {
			// 	throw new HttpException('User not found', 404);
			// }
			// _user.nickname ? user.nickname = user.nickname : user.nickname = _user.nickname;
			// _user.email2fa ? user.email2fa = user.email2fa : user.email2fa = _user.email2fa;
			// _user.profileImageURI ? user.profileImageURI = user.profileImageURI : user.profileImageURI = _user.profileImageURI;
			// _user.use2fa === true ? user.use2fa = true : user.use2fa = false;
			await this.prismaService.user.update({ where: { id }, data: _user });
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
