import { Module } from '@nestjs/common';
import BlockController from './block.controller';
import BlockService from './block.service';

@Module({
	controllers: [BlockController],
	providers: [BlockService],
})
class BlockModule {}

export default BlockModule;
