import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpException,
	Param,
	Patch,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import ParticipantService from './participant.service';
import * as Dto from './dto';
import * as Auth from '../../common/auth';

@Controller('participant')
@ApiTags('participant')
class ParticipantController {
	constructor(private readonly participantService: ParticipantService) {}

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
		@Body() getParticipantListDto: Dto.Request.GetList,
	): Promise<Dto.Response.Participant[]> {
		try {
			if (!(await this.participantService.isParticipated(req.user.id))) {
				throw new BadRequestException('User is not participated');
			}

			return await this.participantService.getList(getParticipantListDto.channelId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Add participant to channel' })
	@ApiOkResponse({
		description: 'Participant added successfully',
		type: Dto.Response.Participant,
	})
	@ApiBadRequestResponse({ description: 'Failed to add participant' })
	async addParticipant(
		@Req() req,
		@Body() createParticipantRequestDto: Dto.Request.Create,
	): Promise<Dto.Response.Participant> {
		try {
			if (await this.participantService.isParticipated(req.user.id)) {
				throw new BadRequestException('User is already participated');
			}
			// channel not found
			// invalid password
			return await this.participantService.create(
				createParticipantRequestDto.channelId,
				req.user.id,
			);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Patch(':id')
	@UseGuards(Auth.Guard.UserJwt)
	@ApiOperation({ summary: 'Update participant' })
	@ApiOkResponse({
		description: 'Participant updated successfully',
		type: Dto.Response.Participant,
	})
	@ApiBadRequestResponse({ description: 'Failed to update participant' })
	async updateParticipant(
		@Req() req,
		@Param('id') id: string,
		@Body() updateParticipantRequestDto: Dto.Request.Update,
	): Promise<Dto.Response.Participant> {
		try {
			if (!(await this.participantService.isAuthorized(req.user.id))) {
				throw new UnauthorizedException('User not authorized');
			}

			return await this.participantService.update(id, updateParticipantRequestDto);
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
