import {
	Body,
	Controller,
	Get,
	HttpException,
	Post,
	Req,
	Request,
	Response,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { CookieService } from './service/cookie.service';
import { ApiTags } from '@nestjs/swagger';
import * as Auth from '../../common/auth';
import * as Dto from './dto';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
		private readonly cookieService: CookieService,
	) {}

	@Get('ft')
	@UseGuards(Auth.Guard.Ft)
	async ftAuth(): Promise<void> {
		return;
	}

	@Get('ft/callback')
	@UseGuards(Auth.Guard.Ft)
	async ftAuthCallback(@Request() req, @Response({ passthrough: true }) res): Promise<void> {
		try {
			const jwt = this.cookieService.createJwt(req.user);
			const cookieOption = this.cookieService.getCookieOption();

			res.cookie('ft-token', jwt, cookieOption);
			res.redirect(`${this.configService.get('NESTJS_URL')}/auth/login`);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get('login')
	@UseGuards(Auth.Guard.FtJwt)
	async login(@Request() req, @Response({ passthrough: true }) res): Promise<User> {
		delete req.user.iat;
		delete req.user.exp;

		const user = await this.authService.login(req.user.intraId);
		if (user.use2fa) {
			throw new UnauthorizedException('2FA 인증이 필요합니다.');
		}

		const jwt = this.cookieService.createJwt(req.user);
		const cookieOption = this.cookieService.getCookieOption();

		res.cookie('accessToken', jwt, cookieOption);

		return user;
	}

	@Post('register')
	@UseGuards(Auth.Guard.FtJwt)
	async register(@Body() registerRequestDto: Dto.Request.Register, @Req() req): Promise<User> {
		return this.authService.register(req.user.intraId, registerRequestDto);
	}
}
