import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import setupSwagger from 'util/swagger';
import AppModule from './app.module';
import PrismaService from './common/prisma/prisma.service';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const prismaService = app.get(PrismaService);
	const originList = [
		configService.get('NEXTJS_URL'),
		configService.get('FT_API_URL'),
		'https://signin.intra.42.fr',
	];

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.enableCors({
		origin: originList,
		credentials: true,
	});
	app.use(cookieParser());
	app.use(passport.initialize());
	app.useWebSocketAdapter(new IoAdapter(app));

	await prismaService.enableShutdownHooks(app);

	setupSwagger(app);

	await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
