import { Module } from '@nestjs/common';
import GameService from './game.service';
import GameController from './game.controller';
import GameGateway from './game.gateway';

@Module({
	providers: [GameService, GameGateway],
	controllers: [GameController],
})
class GameModule {}

export default GameModule;
