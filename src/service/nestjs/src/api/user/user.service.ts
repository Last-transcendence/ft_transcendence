import { Injectable, NotFoundException } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';
import { User } from '@prisma/client';
import * as Dto from './dto';

@Injectable()
class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserById(id: string) {
		try {
			const user = await this.prismaService.user.findUnique({ where: { id } });
			if (!user) {
				throw new NotFoundException('해당 유저가 없습니다.');
			}

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getUserByIntraId(intraId: string) {
		try {
			const user = await this.prismaService.user.findUnique({ where: { intraId } });
			if (!user) {
				throw new NotFoundException('해당 유저가 없습니다.');
			}

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findByIntraId(intraId: string): Promise<User> {
		try {
			const user = await this.prismaService.user.findFirst({ where: { intraId } });
			if (!user) {
				return null;
			}

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findByNickname(nickname: string): Promise<User> {
		try {
			const user = await this.prismaService.user.findFirst({ where: { nickname } });
			if (!user) {
				return null;
			}

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createUser(intraId: string, registerRequestDto: Dto.Request.Create): Promise<User> {
		try {
			const { nickname, profileImageURI, use2fa } = registerRequestDto;

			return this.prismaService.user.create({
				data: { intraId, nickname, profileImageURI, use2fa },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	//partial<Dto.Request.User>
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
