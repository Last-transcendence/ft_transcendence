import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameHistoryModel, GameModel } from 'common/model';
import GameService from './game.service';
import * as Auth from '../../common/auth';
import * as Dto from './dto';

@Controller('game')
@ApiTags('game')
@UseGuards(Auth.Guard.UserJwt)
class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get('/history')
	@ApiOperation({ summary: 'Get the game history' })
	@ApiOkResponse({
		description: 'Game history successfully obtained',
		type: GameModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to get game history' })
	async getHistory(@Req() req): Promise<GameHistoryModel[]> {
		return this.gameService.getHistory(req.user.id);
	}

	@Post('/history')
	@ApiOperation({ summary: 'Add game history' })
	@ApiOkResponse({
		description: 'Game history added successfully',
		type: GameModel,
	})
	@ApiBadRequestResponse({ description: 'Failed to add game history' })
	async createHistory(
		@Req() req,
		@Body() createRequestDto: Dto.Request.CreateHistory,
	): Promise<GameHistoryModel> {
		return this.gameService.createHistory(req.user.id, createRequestDto);
	}
}

export default GameController;
