import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from './service/cookie.service';
import { TwoFactorService } from './service/twofactor.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MailService } from './service/mail.service';
import UserModule from '../user/user.module';
import JwtAuthModule from './jwt/jwt.module';
import FtAuthModule from './ft/ft.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../../common/multer/multer.config';
import UserService from 'api/user/user.service';

@Module({
	imports: [
		UserModule,
		FtAuthModule,
		JwtAuthModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1d' },
			}),
		}),
		CacheModule.register({
			ttl: 300000,
			max: 2,
			isGlobal: true,
		}),
		MulterModule.registerAsync({
			useClass: MulterConfigService,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, CookieService, TwoFactorService, MailService, UserService],
})
class AuthModule {}

export default AuthModule;
