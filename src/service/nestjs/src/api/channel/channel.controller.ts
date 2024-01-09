import {
	Body,
	Controller,
	Get,
	HttpException,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import ChannelModel from 'common/model/channel.model';
import ChannelService from './channel.service';
import * as Dto from './dto';

@Controller('channel')
@ApiTags('channel')
class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Get()
	@ApiOperation({ summary: 'Get channel list' })
	@ApiOkResponse({
		description: 'Get channel list successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Channel not found' })
	async getChannelList(): Promise<Dto.Response.Channel[]> {
		try {
			return await this.channelService.getChannelList();
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get the channel info' })
	@ApiOkResponse({
		description: 'Get the channel info successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to get the channel info' })
	async getChannel(@Param('id', ParseUUIDPipe) id: string) {
		try {
			return await this.channelService.getChannel(id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Create channel' })
	@ApiOkResponse({
		description: 'Channel created successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to create channel' })
	async createChannel(@Body() channelRequestDto: Dto.Request.Channel): Promise<ChannelModel> {
		try {
			return await this.channelService.createChannel(channelRequestDto);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Change channel info' })
	@ApiOkResponse({
		description: 'Channel info changed successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to change channel info' })
	async updateChannel(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateChannelDto: Partial<Dto.Request.Channel>,
	) {
		try {
			return await this.channelService.updateChannel(id, updateChannelDto);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get(':channel_id/participant')
	@ApiOperation({ summary: 'Get the channel participant list' })
	@ApiOkResponse({
		description: 'Channel participant list successfully obtained',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to get channel participant list' })
	async getChannelParticipantList(
		@Param('channel_id') channelId: string,
	): Promise<Dto.Response.Participant[]> {
		try {
			return await this.channelService.getChannelParticipantList(channelId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChannelController;
