import { Body, Controller, Get, HttpException, Post, Query, Req } from '@nestjs/common';
import ChatRoomService from './chatroom.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatModel, ChatRoomModel } from 'common/model';
import { ChatRoomRequestDto, ChatRequestDto } from './dto';

@Controller('chatroom')
@ApiTags('chatroom')
class ChatRoomController {
	constructor(private readonly chatRoomService: ChatRoomService) {}

	@Get()
	@ApiOperation({ summary: 'Get chat room' })
	@ApiOkResponse({ description: 'Get chat room successfully', type: ChatRoomModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getChatRoom(@Req() req): Promise<ChatRoomModel[]> {
		try {
			return await this.chatRoomService.getChatRoom(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Create chat room' })
	@ApiOkResponse({ description: 'Create chat room successfully', type: ChatRoomModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createChatRoom(
		@Body() chatRoomRequestDto: ChatRoomRequestDto,
		@Req() req,
	): Promise<ChatRoomModel> {
		try {
			return await this.chatRoomService.createChatRoom(req.user.id, chatRoomRequestDto.destId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get('chat')
	@ApiOperation({ summary: 'Get chat' })
	@ApiOkResponse({ description: 'Get chat successfully', type: ChatModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getChat(@Query('destId') destId: string, @Req() req): Promise<ChatModel[]> {
		try {
			return await this.chatRoomService.getChat(req.user.id, destId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post('chat')
	@ApiOperation({ summary: 'Create chat' })
	@ApiOkResponse({ description: 'Create chat successfully', type: ChatModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async createChat(@Body() chatRequestDto: ChatRequestDto, @Req() req): Promise<ChatModel> {
		try {
			return await this.chatRoomService.createChat(
				req.user.id,
				chatRequestDto.destId,
				chatRequestDto.content,
			);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChatRoomController;
