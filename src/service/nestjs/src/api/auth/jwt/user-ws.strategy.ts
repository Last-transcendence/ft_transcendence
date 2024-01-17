import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '@prisma/client';
import UserService from 'api/user/user.service';
import { Request } from 'express';

@Injectable()
class UserWsStrategy extends PassportStrategy(Strategy, 'user-ws-jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const cookie = request['handshake']['headers']['cookie'];
					const accessToken = cookie.split('; ').find(x => x.startsWith('accessToken'));
					const token = accessToken.split('=')[1];

					return token;
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

export default UserWsStrategy;
