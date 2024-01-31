import {
	Controller,
	Get,
	HttpException,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
	UploadedFile,
	UseInterceptors,
	Patch,
	Body,
	BadRequestException,
} from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiConsumes,
} from '@nestjs/swagger';
import UserService from './user.service';
import * as Dto from './dto';
import { UserModel } from 'common/model';
import * as Auth from '../../common/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { join } from 'path';

@Controller('user')
@ApiTags('user')
@UseGuards(Auth.Guard.UserJwt)
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	@ApiOperation({ summary: 'Get my information' })
	@ApiOkResponse({ description: 'Get my info successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async me(@Req() req): Promise<UserModel> {
		return req.user;
	}

	@Patch('me')
	@ApiOperation({ summary: 'Update my information' })
	@ApiOkResponse({ description: 'Get my info successfully', type: UserModel })
	@ApiNotFoundResponse({ description: 'User not found' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	async meUpdate(
		@Body() updateData: Dto.Request.UpdateUser,
		@Req() req,
		@UploadedFile() file: Express.Multer.File,
	): Promise<UserModel> {
		try {
			let user = await this.userService.findByIntraId(req.user.intraId);
			if (!user) {
				throw new BadRequestException('User is not registered');
			}

			if (user.nickname !== updateData.nickname) {
				if (await this.userService.findByNickname(updateData.nickname)) {
					throw new BadRequestException('Nickname is already taken');
				}
			}

			if (updateData?.email2fa && user.email2fa !== updateData.email2fa) {
				if (await this.userService.findByEmail(updateData.email2fa)) {
					throw new BadRequestException('Email used in 2fa is already taken');
				}
			}

			updateData.file = file ? file.filename : req.user.profileImageURI;
			if (file && fs.existsSync(join(process.cwd(), 'upload/') + req.user.profileImageURI)) {
				fs.unlinkSync(join(process.cwd(), 'upload/') + req.user.profileImageURI);
			}

			return await this.userService.updateUserById(req.user.id, updateData);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user by id' })
	@ApiOkResponse({ description: 'Get user by id successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async getUserById(@Param('id') id: string): Promise<Dto.Response.User> {
		try {
			return await this.userService.get(id);
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

	@Post('online')
	@ApiOperation({ summary: 'Change status to online' })
	@ApiOkResponse({ description: 'Change status to online successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async online(@Req() req): Promise<UserModel> {
		try {
			return await this.userService.online(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post('offline')
	@ApiOperation({ summary: 'Change status to offline' })
	@ApiOkResponse({ description: 'Change status to offline successfully', type: Dto.Response.User })
	@ApiNotFoundResponse({ description: 'User not found' })
	async offline(@Req() req): Promise<UserModel> {
		try {
			return await this.userService.offline(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default UserController;
