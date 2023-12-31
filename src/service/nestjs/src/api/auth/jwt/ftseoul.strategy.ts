import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { User } from '@prisma/client';
import UserService from '../../user/user.service';
import axios from 'axios';

@Injectable()
export class FtSeoulStrategy extends PassportStrategy(Strategy, 'ft') {
    constructor(private userService: UserService) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=https://dev.transcendence.42seoul.kr&response_type=code`,
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'https://dev.transcendence.42seoul.kr/auth/ft/callback',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: (err: Error, user: any) => void) {
        try {
            const res = await axios.get('https://api.intra.42.fr/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}`},
            });
            const intraId = res.data.login;
            done(null, { intraId: intraId });
        } catch (err) {
            done(err, null);
        }
    }
}
