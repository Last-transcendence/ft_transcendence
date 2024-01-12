import { Module, forwardRef } from '@nestjs/common';
import BanService from './ban.service';
import BanController from './ban.controller';
import ParticipantModule from 'api/participant/participant.module';

@Module({
	imports: [forwardRef(() => ParticipantModule)],
	providers: [BanService],
	controllers: [BanController],
	exports: [BanService],
})
class BanModule {}

export default BanModule;
