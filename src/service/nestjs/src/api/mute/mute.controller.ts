import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import ParticipantService from 'api/participant/participant.service';
import { MuteModel } from 'common/model';
import * as Auth from '../../common/auth';
import * as Dto from './dto';
import MuteService from './mute.service';

@Controller('mute')
@ApiTags('mute')
@UseGuards(Auth.Guard.UserJwt)
class MuteController {
	constructor(
		private readonly muteService: MuteService,
		private readonly participantService: ParticipantService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get the channel mute list' })
	@ApiOkResponse({
		description: 'Get channel mute list successfully',
		type: MuteModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to get channel mute list' })
	async getChannelMuteList(
		@Req() req,
		@Query('channelId', ParseUUIDPipe) channelId: string,
	): Promise<MuteModel[]> {
		try {
			if (!(await this.participantService.isParticipated(req.user.id))) {
				throw new BadRequestException('User is not participated');
			}

			return await this.muteService.getMuteList(channelId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Mute user in channel' })
	@ApiOkResponse({
		description: 'User muted successfully',
		type: MuteModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to mute user' })
	async muteUser(@Req() req, @Body() muteRequestDto: Dto.Request.Create): Promise<MuteModel> {
		try {
			if (!(await this.participantService.isAuthorized(req.user.id))) {
				throw new UnauthorizedException('User is not authorized');
			}

			return await this.muteService.muteUser(muteRequestDto.channelId, muteRequestDto.userId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Unmute user in channel' })
	@ApiOkResponse({
		description: 'User unmuted successfully',
		type: MuteModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to unmute user' })
	async unmuteUser(
		@Req() req,
		@Param('id', new ParseUUIDPipe()) userId: string,
	): Promise<MuteModel> {
		try {
			if (!(await this.participantService.isAuthorized(req.user.id))) {
				throw new UnauthorizedException('User is not authorized');
			}

			return await this.muteService.unmuteUser(req.channeId, userId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default MuteController;
