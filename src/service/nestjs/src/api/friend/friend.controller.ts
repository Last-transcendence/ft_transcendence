import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import FriendService from './friend.service';
import { FriendModel } from 'common/model';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import * as Dto from './dto';
import * as Auth from '../../common/auth';

@Controller('friend')
@ApiTags('friend')
@UseGuards(Auth.Guard.UserJwt)
class FriendController {
	constructor(private readonly friendService: FriendService) {}

	@Get()
	@ApiOperation({ summary: 'Get friend' })
	@ApiOkResponse({ description: 'Get friend successfully', type: FriendModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getFriend(@Req() req): Promise<Dto.Response.Get[]> {
		try {
			return await this.friendService.getFriend(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Create friend' })
	@ApiOkResponse({ description: 'Create friend successfully', type: FriendModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createFriend(
		@Req() req,
		@Body() friendRequestDto: Dto.Request.Friend,
	): Promise<FriendModel> {
		try {
			return await this.friendService.createFriend(req.user.id, friendRequestDto.friendId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete friend' })
	@ApiOkResponse({ description: 'Delete friend successfully', type: FriendModel })
	@ApiNotFoundResponse({ description: 'Friend not found' })
	async deleteFriend(@Req() req, @Param('id') id: string): Promise<FriendModel> {
		try {
			return await this.friendService.deleteFriend(req.user.id, id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default FriendController;
