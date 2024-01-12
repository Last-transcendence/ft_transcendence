import { Module } from '@nestjs/common';
import BanService from './ban.service';
import BanController from './ban.controller';

@Module({
	providers: [BanService],
	controllers: [BanController],
})
class BanModule {}

export default BanModule;
