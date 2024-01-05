import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import UserModule from '../user/user.module';
import { FtSeoulStrategy } from './jwt/ftseoul.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from './service/cookie.service';
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service';
import { FtJwtAuthStrategy } from './jwt/jwtauth.strategy';
// import { JwtAuthModule } from './jwt/jwtauth.module';

@Module({
  imports: [UserModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
    }),
  })],
  providers: [AuthService, FtSeoulStrategy, CookieService, LoginService, RegisterService, FtJwtAuthStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
