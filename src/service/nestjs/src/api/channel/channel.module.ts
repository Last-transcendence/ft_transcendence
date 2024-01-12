import { Module, forwardRef } from '@nestjs/common';
import ChannelController from './channel.controller';
import ChannelService from './channel.service';
import ParticipantModule from 'api/participant/participant.module';

@Module({
	imports: [forwardRef(() => ParticipantModule)],
	controllers: [ChannelController],
	providers: [ChannelService],
	exports: [ChannelService],
})
class ChannelModule {}

export default ChannelModule;
