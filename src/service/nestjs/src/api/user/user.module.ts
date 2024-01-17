import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../common/multer/multer.config';
@Module({
	imports: [
		MulterModule.registerAsync({
			useClass: MulterConfigService,
		}),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
class UserModule {}

export default UserModule;
