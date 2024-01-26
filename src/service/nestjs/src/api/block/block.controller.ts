import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import BlockService from './block.service';
import { BlockModel } from 'common/model';
import * as Auth from '../../common/auth';
import * as Dto from './dto';
import ChatRoomService from 'api/chatroom/chatroom.service';

@Controller('block')
@ApiTags('block')
class BlockController {
	constructor(private readonly blockService: BlockService,
				private readonly chatRoomService: ChatRoomService ) {}

	@Get()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Get block' })
	@ApiOkResponse({ description: 'Get block successfully', type: BlockModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getBlock(@Req() req): Promise<BlockModel[]> {
		try {
			return await this.blockService.get(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Block user' })
	@ApiOkResponse({ description: 'Block user successfully', type: BlockModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async blockUser(@Body() blockRequestDto: Dto.Request.Create, @Req() req): Promise<BlockModel> {
		try {
			const findChatRoom = await this.chatRoomService.find(req.user.id, blockRequestDto.blockedId)
			if (findChatRoom) {
				await this.chatRoomService.delete(findChatRoom.id);
			}
			return await this.blockService.create(req.user.id, blockRequestDto.blockedId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default BlockController;
