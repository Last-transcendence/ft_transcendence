import { Controller, Post, Res, Body, HttpException, Delete, Patch, Query } from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiBadRequestResponse,
	ApiResponse,
} from '@nestjs/swagger';
import { JwtPayload } from 'common/auth/type';
import { Response } from 'express';
import { LoginService, CookieService, RegisterService } from './service';
import { User } from 'common/database/schema/user.schema';
import * as AuthDto from './dto/index';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly loginService: LoginService,
		private readonly cookieService: CookieService,
		private readonly registerService: RegisterService,
	) {}

	@Patch('login')
	@ApiOperation({ summary: 'Login' })
	@ApiOkResponse({ description: 'Login successfully', type: User })
	@ApiBadRequestResponse({ description: 'Bad request' })
	@ApiUnauthorizedResponse({ description: 'ID or password is incorrect' })
	async login(
		@Query('social') social: string | undefined,
		@Body() loginRequestDto: Partial<AuthDto.Request.Login>,
		@Res({ passthrough: true }) response: Response,
	): Promise<User> {
		try {
			const user = await this.loginService.login(social, loginRequestDto);
			const jwt = this.cookieService.createJwt<JwtPayload>({
				_id: user['_id'],
			});
			const cookieOption = this.cookieService.getCookieOption();

			response.cookie('access-token', jwt, cookieOption);

			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	@Post('register')
	@ApiOperation({ summary: 'Register' })
	@ApiResponse({ status: 201, description: 'Register successfully', type: User })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async register(
		@Body() registerRequestDto: AuthDto.Request.Register,
		@Res({ passthrough: true }) response: Response,
	): Promise<User> {
		try {
			const user = await this.registerService.register(registerRequestDto);
			const jwt = this.cookieService.createJwt<JwtPayload>({
				_id: user['_id'],
			});
			const cookieOption = this.cookieService.getCookieOption();

			response.cookie('access-token', jwt, cookieOption);

			return user;
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete('signout')
	@ApiOperation({ summary: 'Logout' })
	@ApiOkResponse({ description: 'Logout successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async logout(@Res({ passthrough: true }) response: Response) {
		try {
			const cookieOption = this.cookieService.getCookieOption();

			response.clearCookie('access-token', cookieOption);

			return { message: 'Logout successfully' };
		} catch (error) {
			console.error(error);
			throw new HttpException(error.message, error.status);
		}
	}
}
