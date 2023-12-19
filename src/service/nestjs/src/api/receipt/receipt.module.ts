import { Module } from '@nestjs/common';
import { receiptController } from './receipt.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	controllers: [receiptController],
})
export class receiptModule {}
