import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
class FtStrategy extends PassportStrategy(Strategy, 'ft-jwt') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request.cookies['ft-token'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
		});
	}

	async validate(payload: any, done: (err: Error, data: any) => void) {
		if (!payload) {
			done(new Error('Invalid payload'), null);
		}
		done(null, payload);
	}
}

export default FtStrategy;
