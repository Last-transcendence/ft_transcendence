import { Module, forwardRef } from '@nestjs/common';
import BanModule from 'api/ban/ban.module';
import MuteModule from 'api/mute/mute.module';
import ParticipantModule from 'api/participant/participant.module';
import ChannelController from './channel.controller';
import ChannelGateway from './channel.gateway';
import ChannelService from './channel.service';

@Module({
	imports: [
		forwardRef(() => ParticipantModule),
		forwardRef(() => BanModule),
		forwardRef(() => MuteModule),
	],
	controllers: [ChannelController],
	providers: [ChannelService, ChannelGateway],
	exports: [ChannelService],
})
class ChannelModule {}

export default ChannelModule;
