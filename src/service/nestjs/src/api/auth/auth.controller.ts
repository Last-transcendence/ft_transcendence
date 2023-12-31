import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    Response,
    UseGuards,
    } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { User } from '@prisma/client';
import { FtSeoulAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() user: User) {
        return this.authService.register(user);
    }

    @Get('login')
    @UseGuards(FtSeoulAuthGuard)
    async FtAuthRedirect(@Request() req) {
        const { user } = req;
        return user;
    }
}
