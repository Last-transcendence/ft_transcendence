import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import UserService from 'api/user/user.service';


@Injectable()
export class LoginService {
    constructor(private userSerivice: UserService) {}

    async login(userIntraId: string) {
        const user = await this.userSerivice.findByIntraId(userIntraId);
        if (!user) {
            throw new HttpException(
                '해당 유저가 없습니다.', 
                HttpStatus.NOT_FOUND
            );
        }
        return user;
    }
}
