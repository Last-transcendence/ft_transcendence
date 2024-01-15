import {
	Body,
	Controller,
	Get,
	HttpException,
	Post,
	Req,
	Request,
	Response,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { CookieService } from './service/cookie.service';
import { TwoFactorService } from './service/twofactor.service';
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
		private readonly twoFactorService: TwoFactorService,
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
		try {
			const user = await this.authService.login(req.user.intraId);
			const jwt = this.cookieService.createJwt({
				id: user.id,
				intraId: user.intraId,
				nickname: user.nickname,
				profileImageURI: user.profileImageURI,
			});
			const cookieOption = this.cookieService.getCookieOption();

			res.cookie('accessToken', jwt, cookieOption);
			res.redirect(`${this.configService.getOrThrow('NEXTJS_URL')}/auth/login/callback`);
		} catch (error) {
			res.redirect(
				`${this.configService.getOrThrow('NEXTJS_URL')}/auth/register?nickname=${
					req.user.nickname
				}`,
			);
		}
	}

	@Post('register')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: 'register' })
	@ApiOkResponse({ description: 'Register successfully', type: User })
	async register(@Body() registerRequestDto: Dto.Request.Register, @Req() req): Promise<User> {
		try {
			return this.authService.register(req.user.intraId, registerRequestDto);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get('2fa')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: '2차 인증 메일' })
	@ApiOkResponse({ description: '2차 인증 이메일 전송 성공' })
	async send2faEmail(@Req() req) {
		const user = await this.authService.login(req.user.intraId);
		console.log(user, req.user)
		return this.twoFactorService.send2faEmail(user);
	}

	@Post('code')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: '2차 인증 로그인' })
	@ApiOkResponse({ description: '2차 인증 코드 인증 성공' })
	async confirmCode(@Req() req, @Body() verificationCode: Dto.Request.TwoFaCode) {
		const user = await this.authService.login(req.user.intraId);
		return this.twoFactorService.confirmVerificationCode(user, verificationCode.twoFaCode);
	}
}
