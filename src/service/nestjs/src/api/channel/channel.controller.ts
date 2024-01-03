import { Body, Controller, Get, HttpException, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import ChannelService from './channel.service';
import ChannelModel from 'common/model/channel.model';
import * as Dto from './dto';

@Controller('channel')
@ApiTags('channel')
class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Get()
	@ApiOperation({summary : 'Get channel list'})
	@ApiOkResponse({description : 'Get channel list successfully', 
					type: ChannelModel})
	@ApiNotFoundResponse({description : 'Channel not found'})
	async getChannelList() {
		try {
			return await this.channelService.getChannelList();
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({summary : 'Create channel'})
	@ApiOkResponse({description : 'Channel created successfully', 
					type: ChannelModel})
	@ApiNotFoundResponse({description : 'Failed to create channel'})
	async createChannel(@Body() channelRequestDto: Dto.Request.Channel)
													: Promise<ChannelModel> {
		try {
			return await this.channelService.createChannel(channelRequestDto.title, 
				channelRequestDto.visibility, channelRequestDto.password);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Patch(':id')
	@ApiOperation({summary : 'Change channel info'})
	@ApiOkResponse({description : 'Channel info changed successfully', 
					type: ChannelModel})
	@ApiNotFoundResponse({description : 'Failed to change channel info'})
	async updateChannel(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateChannelDto: Dto.Request.Update.PartialChannel
	) {
		try {
			return await this.channelService.updateChannel(id, updateChannelDto)
		} catch(error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChannelController;