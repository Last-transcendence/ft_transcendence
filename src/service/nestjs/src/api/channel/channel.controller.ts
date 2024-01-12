import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpException,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as Dto from './dto';
import * as Auth from '../../common/auth';
import { ChannelModel } from 'common/model';
import ChannelService from './channel.service';
import ParticipantService from 'api/participant/participant.service';

@Controller('channel')
@ApiTags('channel')
class ChannelController {
	constructor(
		private readonly channelService: ChannelService,
		private readonly participantService: ParticipantService,
	) {}

	@Get()
	@UseGuards(Auth.Guard.UserJwt)
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
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Get the channel info' })
	@ApiOkResponse({
		description: 'Get the channel info successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to get the channel info' })
	async getChannel(@Req() req, @Param('id', new ParseUUIDPipe()) id: string) {
		try {
			if (!(await this.participantService.isParticipated(req.user.id))) {
				throw new BadRequestException('User is not participated');
			}

			return await this.channelService.getChannel(id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Create channel' })
	@ApiOkResponse({
		description: 'Channel created successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to create channel' })
	async createChannel(
		@Req() req,
		@Body() channelRequestDto: Dto.Request.Create,
	): Promise<Dto.Response.Channel> {
		try {
			const channel = await this.channelService.createChannel(channelRequestDto);
			const user = await this.participantService.create(channel.id, req.user.id);

			await this.participantService.update(user.id, { role: 'OWNER' });
			return channel;
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Patch(':id')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Change channel info' })
	@ApiOkResponse({
		description: 'Channel info changed successfully',
		type: ChannelModel,
	})
	@ApiNotFoundResponse({ description: 'Failed to change channel info' })
	async updateChannel(
		@Req() req,
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() updateChannelDto: Dto.Request.Update,
	): Promise<Dto.Response.UpdateChannel> {
		try {
			if (!(await this.participantService.isAuthorized(req.user.id))) {
				throw new BadRequestException('User is not authorized');
			}

			return await this.channelService.updateChannel(id, updateChannelDto);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ChannelController;
