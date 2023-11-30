import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './club/clubs.module';
import { UserModule } from './user/user.module';
import { receiptModule } from './receipt/receipt.module';
import { ImageModule } from './image/image.module';

@Module({
	imports: [AuthModule, ClubsModule, UserModule, receiptModule, ImageModule],
})
export class ApiModule {}
