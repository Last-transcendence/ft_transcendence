import { Controller, Get, HttpException, Param, Post, Query, Req, UseGuards, UploadedFile, UseInterceptors, Patch, Body } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import UserService from './user.service';
import { JwtAuthGuard } from 'api/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from '../user/multer.options';
import * as Dto from './dto';

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

	@Patch('me')
	// @UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update my information' })
	@ApiOkResponse({ description: 'Get my info successfully', type: Dto.Request.Update })
	// @ApiOkResponse({ description: 'Get my info successfully', type: Dto.Response.User })
	// @ApiNotFoundResponse({ description: 'User not found' })
    // @UseInterceptors(FileInterceptor('profileImage'))
	// async meUpdate(@Body() updateData: Partial<Dto.Response.User>, @Req() req, @UploadedFile() file?: Express.Multer.File): Promise<string> {
	// async meUpdate(@Body() updateData: Dto.Response.User, @Req() req, @UploadedFile() file?: Express.Multer.File): Promise<string> {
	async meUpdate(@Body() updateData: Dto.Request.Update): Promise<string> {
		try {
			console.log('meUpdate', updateData);
			// if (updateData.profileImageURI) {
			// 	await this.userService.setProfileImage(req.user.id, updateData.profileImageURI);
			// }
			// console.log('meUpdate', updateData);
			// await this.userService.updateUserById(req.user.id, req.user);
			// return file ? file.filename : null;
			return 'success';
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
