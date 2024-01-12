import { Module } from '@nestjs/common';
import MuteController from './mute.controller';
import MuteService from './mute.service';
import ParticipantModule from 'api/participant/participant.module';

@Module({
	imports: [ParticipantModule],
	controllers: [MuteController],
	providers: [MuteService],
})
class MuteModule {}

export default MuteModule;
