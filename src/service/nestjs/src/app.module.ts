import { Module } from '@nestjs/common';
import ApiModule from './api/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ApiModule,
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: '.env',
		}),
	],
})
export class AppModule {}
