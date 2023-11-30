import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ApiModule,
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
		}),
		MongooseModule.forRoot(process.env.MONGO_URI),
	],
})
export class AppModule {}
