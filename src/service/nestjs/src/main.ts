import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import PrismaService from './common/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'util/swagger/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
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

	await prismaService.enableShutdownHooks(app);

	setupSwagger(app);

	await app.listen(3000);
}
bootstrap();
