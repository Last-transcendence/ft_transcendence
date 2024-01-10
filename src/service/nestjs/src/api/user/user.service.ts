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

	async createUser(intraId: string, registerRequestDto: Dto.Request.Update): Promise<User> {
		try {
			const { nickname, profileImageURI, use2fa } = registerRequestDto;

			return this.prismaService.user.create({
				data: { intraId, nickname, profileImageURI, use2fa },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateUserById(id: string, _user: Dto.Request.Update) {
		try {
			const updateme = await this.prismaService.user.update({ where: { id }, data: _user,
				select: {
					nickname: true,
					profileImageURI: true,
					email2fa: true,
				}
			});
			return updateme;
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
