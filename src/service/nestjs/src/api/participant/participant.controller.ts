import {
	BadRequestException,
	Controller,
	Get,
	HttpException,
	Inject,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	Req,
	UnauthorizedException,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import BanService from 'api/ban/ban.service';
import ChannelService from 'api/channel/channel.service';
import * as Auth from '../../common/auth';
import * as Dto from './dto';
import ParticipantService from './participant.service';

@Controller('participant')
@ApiTags('participant')
class ParticipantController {
	constructor(
		private readonly participantService: ParticipantService,
		@Inject(forwardRef(() => ChannelService)) private readonly channelService: ChannelService,
		@Inject(forwardRef(() => BanService)) private readonly banService: BanService,
	) {}

	@Get()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Get the channel participant list' })
	@ApiOkResponse({
		description: 'Channel participant list successfully obtained',
		type: Dto.Response.Participant,
	})
	@ApiNotFoundResponse({ description: 'Failed to get channel participant list' })
	async getChannelParticipantList(
		@Req() req,
		@Query('channelId', ParseUUIDPipe) channelId: string,
	): Promise<Dto.Response.Participant[]> {
		try {
			if (!(await this.participantService.isParticipated(req.user.id))) {
				throw new BadRequestException('User is not participated');
			}

			return await this.participantService.getList(channelId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post(':id/kick')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Kick participant from channel' })
	@ApiOkResponse({
		description: 'Participant kicked successfully',
		type: Dto.Response.Participant,
	})
	@ApiBadRequestResponse({ description: 'Failed to kick participant' })
	async kickParticipant(@Req() req, @Param('id') id: string): Promise<Dto.Response.Participant> {
		try {
			if (!(await this.participantService.isAuthorized(req.user.id))) {
				throw new UnauthorizedException('User not authorized');
			}

			return await this.participantService.kick(id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default ParticipantController;
