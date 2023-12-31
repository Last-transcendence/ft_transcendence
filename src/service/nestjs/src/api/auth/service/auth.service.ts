import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import UserService from 'api/user/user.service';


@Injectable()
export class AuthService {
    constructor(private userSerivice: UserService) {}

    async register(userDto: User) {
        const user = await this.userSerivice.findByintraId(userDto.intraId);
        if (user) {
            throw new HttpException(
                '해당 유저가 이미 있습니다.', 
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const user = await this.userSerivice.createByintraId(
                userDto);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
