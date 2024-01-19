import { Module, forwardRef } from '@nestjs/common';
import MuteController from './mute.controller';
import MuteService from './mute.service';
import ParticipantModule from 'api/participant/participant.module';

@Module({
	imports: [forwardRef(() => ParticipantModule)],
	controllers: [MuteController],
	providers: [MuteService],
	exports: [MuteService],
})
class MuteModule {}

export default MuteModule;
