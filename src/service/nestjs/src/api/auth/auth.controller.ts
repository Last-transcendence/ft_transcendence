import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    Response,
    UnauthorizedException,
    UseGuards,
    } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { User } from '@prisma/client';
import { FtSeoulAuthGuard } from './auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CookieService } from './service/cookie.service';
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
        private readonly loginService: LoginService,
        private readonly registerService: RegisterService,
        ) {}

    @Post('register')
    @UseGuards(JwtAuthGuard)
    async register(@Body() user: User) {
        return this.authService.register(user.intraId);
    }

    @Get('test-register')
    async testregister(@Request() req) {
        return this.authService.register(req.user);
    }

    @Get('login')
    @UseGuards(JwtAuthGuard)
    async login(@Request() req, @Response({ passthrough: true}) res) {
        const user = await this.loginService.login(req.user);

        if (user.use2fa) {
            throw new UnauthorizedException('2Fa 인증이 필요합니다.')
        }
        const cookieOption = this.cookieService.getCookieOption();

        const jwt = this.cookieService.createJwt(req.user);
        res.cookie('accesstoken', jwt, cookieOption);

        return user;
    }
    
    @Get('ft')
    @UseGuards(FtSeoulAuthGuard)
    async FtAuth(): Promise<any> {
        return ;
    }

    @Get('ft/callback')
    @UseGuards(FtSeoulAuthGuard)
    async FtAuthCallback(@Request() req, @Response({ passthrough: true}) res): Promise<any> {
        const jwt = this.cookieService.createJwt(req.user);
        const cookieOption = this.cookieService.getCookieOption();
        res.cookie('ft_login', jwt, cookieOption);
        res.redirect('https://dev.transcendence.42seoul.kr/auth/login');
    }
}
