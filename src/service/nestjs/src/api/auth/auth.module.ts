import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService, CookieService, RegisterService } from './service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthModule } from './jwt/jwtAuth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'common/database/schema/user.schema';

@Module({
	imports: [
		JwtAuthModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: UserSchema,
			},
		]),
	],
	controllers: [AuthController],
	providers: [LoginService, CookieService, RegisterService],
})
export class AuthModule {}
