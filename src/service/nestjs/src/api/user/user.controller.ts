import { Controller, Get, HttpException, Param, Post, Query, Req, UseGuards, UploadedFile, UseInterceptors, Patch,ParseUUIDPipe, Body } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import UserService from './user.service';
import { JwtAuthGuard } from 'api/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from '../user/multer.options';
import * as Dto from './dto';
import { UserModel } from 'common/model';

@Controller('user')
@ApiTags('user')
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get my information' })
	@ApiOkResponse({ description: 'Get my info successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async me(@Req() req): Promise<Dto.Response.User> {
		const { user } = req;
		console.log('me', user);
		return user;
	}

	@Patch('me/:id')
	// @UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update my information' })
	@ApiOkResponse({ description: 'Get my info successfully', type: UserModel })
	@ApiNotFoundResponse({ description: 'User not found' })
    // @UseInterceptors(FileInterceptor('profileImage'))
	async meUpdate(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateData: Dto.Request.Update ,
		@Req() req
	): Promise<Dto.Response.User> {
		try {
			// if (updateData.profileImageURI) {
			// 	await this.userService.setProfileImage(req.user.id, updateData.profileImageURI);
			// }
			console.log(updateData.nickname);

			return await this.userService.updateUserById(req.user.id, updateData);
		}
		catch (error) {
			throw new HttpException(error.message, error.status);
		}
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
