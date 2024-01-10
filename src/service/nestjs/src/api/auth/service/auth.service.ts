import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import UserService from 'api/user/user.service';
import * as Dto from '../dto';

@Injectable()
export class AuthService {
	constructor(private userSerivice: UserService) {}

	async login(intraId: string) {
		try {
			const user = await this.userSerivice.findByIntraId(intraId);
			if (!user) {
				throw new NotFoundException('해당 유저가 없습니다.');
			}

			return user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async register(intraId: string, registerRequestDto: Dto.Request.Register) {
		try {
			const user = await this.userSerivice.findByIntraId(intraId);
			if (user) {
				throw new BadRequestException('이미 가입된 유저입니다.');
			}

			const nickname = await this.userSerivice.findByNickname(registerRequestDto.nickname);
			if (nickname) {
				throw new BadRequestException('이미 사용중인 닉네임입니다.');
			}

			return await this.userSerivice.createUser(intraId, registerRequestDto);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
