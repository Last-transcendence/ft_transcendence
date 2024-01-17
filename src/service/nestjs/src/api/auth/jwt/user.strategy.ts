import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from '@prisma/client';
import UserService from '../../user/user.service';

@Injectable()
class UserStrategy extends PassportStrategy(Strategy, 'user-jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request.cookies['accessToken'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
		});
	}

	async validate(payload: any, done: (err: Error, data: User) => void) {
		try {
			const user = await this.userService.findByIntraId(payload.intraId);
			if (!user) {
				throw new NotFoundException();
			}

			done(null, user);
		} catch (error) {
			done(error, null);
		}
	}
}

export default UserStrategy;
