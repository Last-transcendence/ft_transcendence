import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import UserModule from './user/user.module';
import PrismaModule from 'common/prisma/prisma.module';
@Module({
	imports: [UserModule, PrismaModule, AuthModule],
})
class ApiModule {}

export default ApiModule;
