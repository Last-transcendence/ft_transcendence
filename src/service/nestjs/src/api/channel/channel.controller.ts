import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import ChannelModel from 'common/model/channel.model';
import ChannelService from './service/channel.service';
import ParticipantService from './service/participant.service';
import MuteModel from 'common/model/mute.model';
import MuteService from './service/mute.service';
import * as Dto from './dto';
import * as Auth from '../../common/auth';

@Controller('channel')
@ApiTags('channel')
class ChannelController {
	constructor(
		private readonly channelService: ChannelService,
		private readonly participantService: ParticipantService,
		private readonly muteService: MuteService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get channel list' })
	@ApiOkResponse({
		description: 'Get channel list successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Channel not found' })
	async getChannelList(): Promise<ChannelModel[]> {
		try {
			return await this.channelService.getChannelList();
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

	@Get(':channelId/participant')
	@ApiOperation({ summary: 'Get the channel participant list' })
	@ApiOkResponse({
		description: 'Channel participant list successfully obtained',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to get channel participant list' })
	async getChannelParticipantList(
		@Param('channelId') channelId: string,
	): Promise<Dto.Response.Participant[]> {
		try {
			return await this.participantService.getParticipantList(channelId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Get(':channelId/mute')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Get the channel mute list' })
	@ApiOkResponse({
		description: 'Get channel mute list successfully',
		type: ChannelModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to get channel mute list' })
	async getChannelMuteList(
		@Param('channelId', ParseUUIDPipe) channelId: string,
	): Promise<MuteModel[]> {
		try {
			return await this.muteService.getMuteList(channelId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post(':channelId/mute')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Mute user in channel' })
	@ApiOkResponse({
		description: 'User muted successfully',
		type: ChannelModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to mute user' })
	async muteUser(
		@Req() req,
		@Param('channelId', ParseUUIDPipe) channelId: string,
		@Body() muteRequestDto: Dto.Request.Mute,
	): Promise<MuteModel> {
		try {
			return await this.muteService.muteUser(req.user.id, channelId, muteRequestDto);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete(':channelId/mute/:muteId')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Unmute user in channel' })
	@ApiOkResponse({
		description: 'User unmuted successfully',
		type: ChannelModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to unmute user' })
	async unmuteUser(
		@Req() req,
		@Param('channelId', ParseUUIDPipe) channelId: string,
		@Param('muteId', ParseUUIDPipe) muteId: string,
	): Promise<MuteModel> {
		try {
			return await this.muteService.unmuteUser(req.user.id, channelId, muteId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChannelController;
