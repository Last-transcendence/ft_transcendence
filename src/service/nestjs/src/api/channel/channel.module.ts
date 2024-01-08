import { Module } from '@nestjs/common';
import ChannelController from './channel.controller';
import ChannelService from './service/channel.service';
import ParticipantService from './service/participant.service';
import MuteService from './service/mute.service';

@Module({
	controllers: [ChannelController],
	providers: [ChannelService, ParticipantService, MuteService],
})
class ChannelModule {}

export default ChannelModule;
