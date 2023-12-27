import { Body, Controller, Get, HttpException, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BlockService from './block.service';
import { BlockModel } from 'common/model';
import { BlockRequestDto } from './dto';

@Controller('block')
@ApiTags('block')
class BlockController {
	constructor(private readonly blockService: BlockService) {}

	@Get()
	async getBlockList(@Req() req): Promise<BlockModel[]> {
		try {
			return await this.blockService.getBlockList(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	async blockUser(@Body() blockRequestDto: BlockRequestDto, @Req() req): Promise<BlockModel> {
		try {
			return await this.blockService.blockUser(req.user.id, blockRequestDto.blockedId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default BlockController;
