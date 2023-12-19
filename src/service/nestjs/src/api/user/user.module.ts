import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'common/database/schema';
import { ImageModule } from 'api/image/image.module';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), ImageModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
