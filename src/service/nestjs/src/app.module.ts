import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ApiModule from './api/api.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: '.env',
		}),
		ApiModule,
	],
})
class AppModule {}

export default AppModule;
