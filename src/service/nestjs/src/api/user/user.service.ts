import { Injectable } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';
import { User } from '@prisma/client';
import * as Dto from './dto';
@Injectable()
class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async get(id: string) {
		try {
			return await this.prismaService.user.findUnique({ where: { id } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findByIntraId(intraId: string): Promise<User> {
		try {
			return await this.prismaService.user.findUnique({ where: { intraId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findByNickname(nickname: string): Promise<User> {
		try {
			return await this.prismaService.user.findFirst({ where: { nickname } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findByEmail(email2fa: string): Promise<User> {
		try {
			return await this.prismaService.user.findFirst({ where: { email2fa } });
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(
		intraId: string,
		{ use2fa, file, ...registerRequestDto }: Dto.Request.Create,
	): Promise<User> {
		try {
			return await this.prismaService.user.create({
				data: {
					intraId,
					...registerRequestDto,
					profileImageURI: file,
					use2fa: use2fa === 'true' ? true : false,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateUserById(
		id: string,
		{ use2fa, file, ...updateRequestDto }: Partial<Dto.Request.UpdateUser>,
	): Promise<User> {
		try {
			return await this.prismaService.user.update({
				where: { id },
				data: {
					profileImageURI: file,
					use2fa: use2fa === 'true' ? true : false,
					...updateRequestDto,
				},
			});
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

	async online(userId: string) {
		try {
			return await this.prismaService.user.update({
				where: { id: userId },
				data: { status: 'ONLINE' },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async offline(userId: string) {
		try {
			return await this.prismaService.user.update({
				where: { id: userId },
				data: { status: 'OFFLINE' },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async playing(userId: string) {
		try {
			return await this.prismaService.user.update({
				where: { id: userId },
				data: { status: 'PLAYING' },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async deleteUser(userId: string) {
		try {
			return await this.prismaService.user.delete({ where: { id: userId } });
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default UserService;
