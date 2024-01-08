import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
import UserService from '../../user/user.service';
import { ConfigService } from '@nestjs/config';

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
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: any, done: (err: Error, data: User) => void) {
		const user = await this.userService.getUserByIntraId(payload.user.intraId);
		if (!user) {
			throw new UnauthorizedException();
		}

		done(null, user);
	}
}

export default UserStrategy;
