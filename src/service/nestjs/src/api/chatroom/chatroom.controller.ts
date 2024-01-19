import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import ChatRoomService from './chatroom.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatRoomModel } from 'common/model';
import * as Dto from './dto';
import * as Auth from '../../common/auth';

@Controller('chatroom')
@ApiTags('chatroom')
@UseGuards(Auth.Guard.UserJwt)
class ChatRoomController {
	constructor(private readonly chatRoomService: ChatRoomService) {}

	@Get()
	@ApiOperation({ summary: 'Get chat room' })
	@ApiOkResponse({ description: 'Get chat room successfully', type: ChatRoomModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getChatRoom(@Req() req): Promise<ChatRoomModel[]> {
		try {
			return await this.chatRoomService.get(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Create chat room' })
	@ApiOkResponse({ description: 'Create chat room successfully', type: ChatRoomModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createChatRoom(
		@Req() req,
		@Body() chatRoomRequestDto: Dto.Request.Create,
	): Promise<ChatRoomModel> {
		try {
			const chatRoom = await this.chatRoomService.get(req.user.id);
			if (chatRoom.find(room => room.destId === chatRoomRequestDto.destId)) {
				throw new Error('Chat room already exists');
			}

			return await this.chatRoomService.create(req.user.id, chatRoomRequestDto.destId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChatRoomController;
