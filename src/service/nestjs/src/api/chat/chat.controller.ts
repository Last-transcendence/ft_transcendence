import { Body, Controller, Get, HttpException, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatModel } from 'common/model';
import ChatService from './chat.service';
import * as Auth from '../../common/auth';
import * as Dto from './dto';

@Controller('chat')
@ApiTags('chat')
class ChatController {
	constructor(private readonly chatRoomService: ChatService) {}

	@Get()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Get chat' })
	@ApiOkResponse({ description: 'Get chat successfully', type: ChatModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getChat(@Req() req, @Query('destId') destId: string): Promise<ChatModel[]> {
		try {
			return await this.chatRoomService.get(req.user.id, destId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Create chat' })
	@ApiOkResponse({ description: 'Create chat successfully', type: ChatModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createChat(@Req() req, @Body() chatRequestDto: Dto.Request.Create): Promise<ChatModel> {
		try {
			return await this.chatRoomService.create(
				req.user.id,
				chatRequestDto.destId,
				chatRequestDto.content,
			);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChatController;
