import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
class FtStrategy extends PassportStrategy(Strategy, 'ft') {
	constructor(private readonly configService: ConfigService) {
		super({
			authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${configService.getOrThrow(
				'CLIENT_ID',
			)}&redirect_uri=https://dev.transcendence.42seoul.kr&response_type=code`,
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: configService.getOrThrow('CLIENT_ID'),
			clientSecret: configService.getOrThrow('CLIENT_SECRET'),
			callbackURL: 'https://dev.transcendence.42seoul.kr/auth/ft/callback',
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
				.get('https://api.intra.42.fr/v2/me', {
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
