import {
	Body,
	Controller,
	Get,
	HttpException,
	Inject,
	Post,
	Req,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BanModel } from 'common/model';
import BanService from './ban.service';
import ParticipantService from 'api/participant/participant.service';
import * as Auth from '../../common/auth';
import * as Dto from './dto';

@Controller('ban')
@ApiTags('ban')
@UseGuards(Auth.Guard.UserJwt)
class BanController {
	constructor(
		private readonly banService: BanService,
		@Inject(forwardRef(() => ParticipantService))
		private readonly participantService: ParticipantService,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get ban' })
	@ApiOkResponse({ description: 'Get ban successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async getBan(@Req() req): Promise<BanModel[]> {
		try {
			return await this.banService.get(req.user.id);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@Post()
	@ApiOperation({ summary: 'Ban user' })
	@ApiOkResponse({ description: 'Ban user successfully' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	async ban(@Req() req, @Body() createRequestDto: Dto.Request.Create): Promise<BanModel> {
		try {
			if (!(await this.participantService.isAuthorized(req.user.id))) {
				throw new Error('Unauthorized');
			}

			const participant = await this.participantService.get(createRequestDto.userId);
			await this.participantService.kick(participant.id);

			return await this.banService.create(createRequestDto.channelId, createRequestDto.userId);
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}
}

export default BanController;
