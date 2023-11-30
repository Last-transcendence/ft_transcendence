import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'util/swagger/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
			forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다.
			transform: true,
		}),
	);

	app.enableCors({
		origin: [configService.getOrThrow('REACT_URL')],
		credentials: true,
	});

	setupSwagger(app);
	app.use(cookieParser());
	await app.listen(parseInt(configService.getOrThrow('PORT')));
}
bootstrap();
