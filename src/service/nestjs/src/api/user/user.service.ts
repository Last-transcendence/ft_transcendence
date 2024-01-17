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

	async create(intraId: string, registerRequestDto: Dto.Request.Create): Promise<User> {
		try {
			return await this.prismaService.user.create({
				data: { intraId, ...registerRequestDto },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateUserById(id: string, updateRequestDto: Dto.Request.UpdateUser, filename: string): Promise<User> {
		try {
			delete updateRequestDto.file;
			delete updateRequestDto.use2fa;
			return await this.prismaService.user.update({ where: { id }, data: { ...updateRequestDto, profileImageURI: filename} });
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
