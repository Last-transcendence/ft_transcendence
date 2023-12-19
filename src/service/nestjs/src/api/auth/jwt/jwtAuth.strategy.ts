import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from 'common/auth/type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'common/database/schema/user.schema';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
	constructor(
		@InjectModel('User')
		private userModel: Model<User>,
	) {
		const configService: ConfigService = new ConfigService();

		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.['access-token'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(payload: JwtPayload, done: (error: Error, user: User) => void): Promise<void> {
		try {
			if (!payload._id) {
				throw new UnauthorizedException('Invalid JwtPayload');
			}

			const user = await this.userModel.findById(payload._id);

			if (!user) {
				throw new UnauthorizedException('User not found');
			}

			done(null, user);
		} catch (error) {
			done(error, null);
		}
	}
}
