import { Module } from '@nestjs/common';
import PrismaModule from 'common/prisma/prisma.module';
import UserModule from './user/user.module';
import FriendModule from './friend/friend.module';

@Module({
	imports: [PrismaModule, UserModule, FriendModule],
})
class ApiModule {}

export default ApiModule;
