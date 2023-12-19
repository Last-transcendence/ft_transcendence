import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class CookieService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	getCookieOption(): CookieOptions {
		const maxAge = 60 * 60 * 1000;

		return this.configService.get('cookie') === 'production'
			? { secure: true, sameSite: 'none', maxAge }
			: { maxAge };
	}

	createJwt<T extends Record<string, string | number | boolean | Types.ObjectId>>(
		payload: T,
	): string {
		return this.jwtService.sign(payload);
	}

	verifyJwt<T extends Record<string, string | number | boolean | Types.ObjectId>>(
		token: string,
	): T {
		return this.jwtService.verify(token);
	}
}
