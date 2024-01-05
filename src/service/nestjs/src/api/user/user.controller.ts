import { Controller, Get, HttpException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import UserService from './user.service';
import { FtSeoulAuthGuard } from 'api/auth/auth.guard';
import { JwtAuthGuard } from 'api/auth/jwt-auth.guard';
import * as Dto from './dto';

@Controller('user')
@ApiTags('user')
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get my information' })
	@ApiOkResponse({ description: 'Get my info successfully', type: UserModel })
	@ApiNotFoundResponse({ description: 'User not found' })
	async me(@Req() req): Promise<UserModel> {
		const { user } = req;
		console.log('me', user, req);
		return user;
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user by id' })
	@ApiOkResponse({ description: 'Get user by id successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async getUserById(@Param('id') id: string): Promise<Dto.Response.User> {
		try {
			return await this.userService.getUserById(id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}


	@Post('search')
	@ApiOperation({ summary: 'Search user by nickname' })
	@ApiOkResponse({ description: 'Search user by nickname successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async searchUserByNickname(@Query('queryString') nickname: string): Promise<Dto.Response.User[]> {
		try {
			return await this.userService.searchUserByNickname(nickname);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default UserController;
