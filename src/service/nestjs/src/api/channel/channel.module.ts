import { Module, forwardRef } from '@nestjs/common';
import BanModule from 'api/ban/ban.module';
import BlockService from 'api/block/block.service';
import GameModule from 'api/game/game.module';
import MuteModule from 'api/mute/mute.module';
import ParticipantModule from 'api/participant/participant.module';
import UserModule from 'api/user/user.module';
import ChannelController from './channel.controller';
import ChannelGateway from './channel.gateway';
import ChannelService from './channel.service';

@Module({
	imports: [
		forwardRef(() => ParticipantModule),
		forwardRef(() => BanModule),
		forwardRef(() => MuteModule),
		UserModule,
		GameModule,
	],
	controllers: [ChannelController],
	providers: [ChannelService, ChannelGateway, BlockService],
	exports: [ChannelService],
})
class ChannelModule {}

export default ChannelModule;
