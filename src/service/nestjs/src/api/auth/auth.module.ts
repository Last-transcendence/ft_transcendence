import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import UserModule from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from './service/cookie.service';
import * as Ft from './ft';
import * as Jwt from './jwt';
import MailService from 'api/mail/mail.service';
import { TwoFactorService } from './service/twofactor.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1d' },
			}),
		}),
		CacheModule.register({
			ttl: 300000,
			max: 2,
			isGlobal: true,
		}),
	],
	providers: [AuthService, CookieService, Ft.FtStrategy, Jwt.FtStrategy, Jwt.UserStrategy, MailService, TwoFactorService],
	controllers: [AuthController],
})
class AuthModule {}

export default AuthModule;
