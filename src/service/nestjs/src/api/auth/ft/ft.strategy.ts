import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
class FtStrategy extends PassportStrategy(Strategy, 'ft') {
	constructor(private readonly configService: ConfigService) {
		super({
			authorizationURL: `${configService.getOrThrow(
				'FT_API_URL',
			)}/oauth/authorize?client_id=${configService.getOrThrow(
				'CLIENT_ID',
			)}&redirect_uri=${configService.getOrThrow('NESTJS_URL')}&response_type=code`,
			tokenURL: `${configService.getOrThrow('FT_API_URL')}/oauth/token`,
			clientID: configService.getOrThrow('CLIENT_ID'),
			clientSecret: configService.getOrThrow('CLIENT_SECRET'),
			callbackURL: `${configService.getOrThrow('NESTJS_URL')}/auth/ft/callback`,
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Record<string, string>,
		done: (err: Error, user: any) => void,
	) {
		try {
			const user = await axios
				.get(`${this.configService.getOrThrow('FT_API_URL')}/v2/me`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
				.then(response => {
					return {
						intraId: response.data.login,
						name: response.data.displayname,
						email: response.data.email,
					};
				})
				.catch(err => {
					throw err;
				});

			done(null, user);
		} catch (err) {
			done(err, null);
		}
	}
}

export default FtStrategy;
