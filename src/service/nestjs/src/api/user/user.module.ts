import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
@Module({
	imports: [
		// ServeStaticModule.forRoot({
		// 	// rootPath: join(__dirname, '..', 'client'),
		// 	rootPath: '../common/uploads',
		// 	serveRoot: 'upload',
		// }),
		MulterModule.register({
			dest: './uploads',
		}),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
class UserModule {}

export default UserModule;
