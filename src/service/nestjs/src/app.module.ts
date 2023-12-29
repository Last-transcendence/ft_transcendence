import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './api/auth/service/auth.service';
import UserModule from './api/user/user.module';
import ApiModule from './api/api.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: '.env',
		}),
		UserModule,
		ApiModule,
	],
	providers: [AuthService],
})
class AppModule {}

export default AppModule;
