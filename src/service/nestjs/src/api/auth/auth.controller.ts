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
import {
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as Auth from '../../common/auth';
import * as Dto from './dto';
import { User } from 'api/user/dto/response';

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
	@ApiOperation({ summary: 'ft authentication' })
	async ftAuth(): Promise<void> {
		return;
	}

	@Get('ft/callback')
	@UseGuards(Auth.Guard.Ft)
	@ApiOperation({ summary: 'ft authentication callback' })
	async ftAuthCallback(@Request() req, @Response({ passthrough: true }) res): Promise<void> {
		try {
			const jwt = this.cookieService.createJwt(req.user);
			const cookieOption = this.cookieService.getCookieOption();

			res.cookie('ft-token', jwt, cookieOption);
			res.redirect(`${this.configService.getOrThrow('NESTJS_URL')}/auth/login`);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get('login')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: 'login' })
	@ApiResponse({ status: 302, description: 'Redirect to login callback page' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	async login(@Request() req, @Response({ passthrough: true }) res) {
		delete req.user.iat;
		delete req.user.exp;

		const user = await this.authService.login(req.user.intraId);
		if (user.use2fa) {
			throw new UnauthorizedException('2FA 인증이 필요합니다.');
		}

		const jwt = this.cookieService.createJwt(req.user);
		const cookieOption = this.cookieService.getCookieOption();

		res.cookie('accessToken', jwt, cookieOption);
		res.redirect(`${this.configService.getOrThrow('NEXTJS_URL')}/auth/login/callback`);
	}

	@Post('register')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: 'register' })
	@ApiOkResponse({ description: 'Register successfully', type: User })
	async register(@Body() registerRequestDto: Dto.Request.Register, @Req() req): Promise<User> {
		return this.authService.register(req.user.intraId, registerRequestDto);
	}
}
