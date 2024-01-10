import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..' , '..' , 'uploads'),
			serveRoot: '/me',
		}),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
class UserModule {}

export default UserModule;
