import { Body, Controller, Delete, Get, HttpException, Post, Req } from '@nestjs/common';
import FriendService from './friend.service';
import { FriendModel } from 'common/model';
import { ApiTags } from '@nestjs/swagger';
import { FriendRequestDto } from './dto';

@ApiTags('friend')
@Controller('friend')
class FriendController {
	constructor(private readonly friendService: FriendService) {}

	@Get()
	async getFriendList(@Req() req): Promise<FriendModel[]> {
		try {
			return await this.friendService.getFriendList(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	async addFriend(@Body() friendRequestDto: FriendRequestDto, @Req() req): Promise<FriendModel> {
		try {
			return await this.friendService.addFriend(req.user.id, friendRequestDto.friendId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete(':id')
	async deleteFriend(@Req() req): Promise<FriendModel> {
		try {
			return await this.friendService.deleteFriend(req.user.id, req.params.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default FriendController;
