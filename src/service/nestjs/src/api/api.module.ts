import { Module } from '@nestjs/common';
import ChatroomModule from './chatroom/chatroom.module';
import BlockModule from './block/block.module';
import PrismaModule from 'common/prisma/prisma.module';
import UserModule from './user/user.module';
import FriendModule from './friend/friend.module';

@Module({
	imports: [PrismaModule, UserModule, FriendModule, BlockModule, ChatroomModule],
})
class ApiModule {}

export default ApiModule;
