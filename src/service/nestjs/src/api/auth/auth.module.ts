import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from './service/cookie.service';
import UserModule from '../user/user.module';
import JwtAuthModule from './jwt/jwt.module';
import FtAuthModule from './ft/ft.module';

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
	],
	controllers: [AuthController],
	providers: [AuthService, CookieService],
})
class AuthModule {}

export default AuthModule;
