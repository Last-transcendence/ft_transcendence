import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
import UserService from '../../user/user.service';

@Injectable()
export class FtJwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request.cookies['ft_login'];
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: User, done: (err: Error, data: User) => void) {
        const user = await this.userService.getUserByIntraId(payload.intraId);
        if (!user) {
            throw new UnauthorizedException();
        }
        done(null, user);
    }
        
}
