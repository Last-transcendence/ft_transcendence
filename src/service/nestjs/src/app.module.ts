import { Module } from '@nestjs/common';
import ApiModule from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './api/auth/service/auth.service';
import UserModule from './api/user/user.module';
@Module({
	imports: [
		ApiModule,
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: '.env',
		}),
		UserModule,
	],
	providers: [AuthService],
})
export class AppModule {}
