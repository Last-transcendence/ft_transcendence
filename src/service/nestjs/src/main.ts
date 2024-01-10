import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'util/swagger/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

import AppModule from './app.module';
import PrismaService from './common/prisma/prisma.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);
	const prismaService = app.get(PrismaService);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.enableCors({
		origin: configService.get('NEXTJS_URL'),
		credentials: true,
	});
	app.use(cookieParser());

	app.use(
		session({
			secret: 'important-secret',
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
			},
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	await prismaService.enableShutdownHooks(app);

	setupSwagger(app);
	app.useStaticAssets(join(__dirname, '..', 'nextjs'));
	await app.listen(3000);
}
bootstrap();
