import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './jwtAuth.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'common/database/schema/user.schema';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: UserSchema,
			},
		]),
	],
	providers: [JwtAuthStrategy],
})
export class JwtAuthModule {}
