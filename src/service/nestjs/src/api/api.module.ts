import { Module } from '@nestjs/common';
import { BlockModule } from './block/block.module';
import PrismaModule from 'common/prisma/prisma.module';
import UserModule from './user/user.module';
import FriendModule from './friend/friend.module';

@Module({
	imports: [PrismaModule, UserModule, FriendModule, BlockModule],
})
class ApiModule {}

export default ApiModule;
