import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpException,
	Inject,
	Param,
	ParseUUIDPipe,
	Patch,
	Req,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import ParticipantService from 'api/participant/participant.service';
import { ChannelModel } from 'common/model';
import ChannelService from './channel.service';
import * as Dto from './dto';
import * as Auth from '../../common/auth';

@Controller('channel')
@ApiTags('channel')
class ChannelController {
	constructor(
		private readonly channelService: ChannelService,
		@Inject(forwardRef(() => ParticipantService))
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
}

export default ChannelController;
