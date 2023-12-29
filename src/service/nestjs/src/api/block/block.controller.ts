import { Body, Controller, Get, HttpException, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import BlockService from './block.service';
import { BlockModel } from 'common/model';
import * as Dto from './dto';

@Controller('block')
@ApiTags('block')
class BlockController {
	constructor(private readonly blockService: BlockService) {}

	@Get()
	@ApiOperation({ summary: 'Get block' })
	@ApiOkResponse({ description: 'Get block successfully', type: BlockModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getBlock(@Req() req): Promise<BlockModel[]> {
		try {
			return await this.blockService.getBlock(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Block user' })
	@ApiOkResponse({ description: 'Block user successfully', type: BlockModel })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async blockUser(@Body() blockRequestDto: Dto.Request.Block, @Req() req): Promise<BlockModel> {
		try {
			return await this.blockService.blockUser(req.user.id, blockRequestDto.blockedId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default BlockController;
