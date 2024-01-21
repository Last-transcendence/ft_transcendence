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
	Delete,
	UploadedFile,
	UseInterceptors,
	UnauthorizedException,
	BadRequestException,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiConsumes,
} from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { CookieService } from './service/cookie.service';
import { TwoFactorService } from './service/twofactor.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'api/user/dto/response';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from 'api/auth/service/mail.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import * as Auth from '../../common/auth';
import * as Dto from './dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
		private readonly cookieService: CookieService,
		private readonly twoFactorService: TwoFactorService,
		private readonly mailService: MailService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
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
			if (user.use2fa) {
				throw new UnauthorizedException("Try login with two factor authentication: POST /auth/2fa")
			}
			const jwt = this.cookieService.createJwt({
				id: user.id,
				intraId: user.intraId,
				nickname: user.nickname,
				profileImageURI: user.profileImageURI,
			});
			const cookieOption = this.cookieService.getCookieOption();

			user.status = 'ONLINE';
			await this.prismaService.user.update({ where: { id: user.id }, data: { status: 'ONLINE' } });
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
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	async register(
		@Body() registerRequestDto: Dto.Request.Register, 
		@Req() req,
		@UploadedFile() file: Express.Multer.File,
	): Promise<User> {
		try {
			registerRequestDto.file = file ? file.filename : req.user.profileImageURI;
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
		try {
			const code = await this.twoFactorService.createCode();
			const user = await this.authService.login(req.user.intraId)
			if (!user || !user.use2fa || !user.email2fa) {
				throw new BadRequestException("Bad request")
			}
			this.cacheManager.set(user.email2fa, code);
			this.mailService.send(user.email2fa, user.nickname, code)
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post('2fa')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: '2차 인증 로그인' })
	@ApiOkResponse({ description: '2차 인증 코드 인증 성공' })
	async confirmCode(
		@Req() req,
		@Response({ passthrough: true }) res,
		@Body() verificationCode: Dto.Request.TwoFaCode,
	) {
		try {
			const user = await this.authService.login(req.user.intraId);
			await this.twoFactorService.confirmVerificationCode(user, verificationCode.twoFaCode);
			const cookieOption = this.cookieService.getCookieOption();
			const jwt = this.cookieService.createJwt({
				id: user.id,
				intraId: user.intraId,
				nickname: user.nickname,
				profileImageURI: user.profileImageURI,
			});
			user.status = 'ONLINE';
			await this.prismaService.user.update({ where: { id: user.id }, data: { status: 'ONLINE' } });
			res.cookie('accessToken', jwt, cookieOption);
			res.redirect(`${this.configService.getOrThrow('NEXTJS_URL')}/auth/login/callback`);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete('logout')
	@UseGuards(Auth.Guard.FtJwt)
	@ApiOperation({ summary: 'logout' })
	@ApiOkResponse({ description: 'Logout successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async logout(@Req() req, @Response({ passthrough: true }) res) {
		try {
			const cookieOption = this.cookieService.getCookieOption();
			res.clearCookie('accessToken', cookieOption);
			return { message: 'Logout successfully' };
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}
