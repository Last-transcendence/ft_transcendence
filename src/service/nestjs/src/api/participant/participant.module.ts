import { Module, forwardRef } from '@nestjs/common';
import ParticipantService from './participant.service';
import ParticipantController from './participant.controller';
import ChannelModule from 'api/channel/channel.module';
import BanModule from 'api/ban/ban.module';

@Module({
	imports: [forwardRef(() => ChannelModule), forwardRef(() => BanModule)],
	providers: [ParticipantService],
	controllers: [ParticipantController],
	exports: [ParticipantService],
})
class ParticipantModule {}

export default ParticipantModule;
