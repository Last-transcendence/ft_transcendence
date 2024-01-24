import { Module } from '@nestjs/common';
import GameService from './game.service';
import GameController from './game.controller';
import GameGateway from './game.gateway';
import UserModule from 'api/user/user.module';

@Module({
	imports: [UserModule],
	providers: [GameService, GameGateway],
	controllers: [GameController],
	exports: [GameService],
})
class GameModule {}

export default GameModule;
