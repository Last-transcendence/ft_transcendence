import { Module } from '@nestjs/common';
import ChannelController from './channel.controller';
import ChannelService from './channel.service';
import ParticipantModule from 'api/participant/participant.module';

@Module({
	imports: [ParticipantModule],
	controllers: [ChannelController],
	providers: [ChannelService],
})
class ChannelModule {}

export default ChannelModule;
