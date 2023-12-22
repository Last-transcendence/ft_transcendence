import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly configService: ConfigService) {
		super({
			datasources: {
				db: {
					url: configService.get('DATABASE_URL'),
				},
			},
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}

	async enableShutdownHooks(app: INestApplication) {
		process.on('beforeExit', async () => {
			await app.close();
		});
	}
}

export default PrismaService;
