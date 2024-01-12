import { Module } from '@nestjs/common';
import PrismaModule from 'common/prisma/prisma.module';
import AuthModule from './auth/auth.module';
import ChatModule from './chat/chat.module';
import MuteModule from './mute/mute.module';
import ParticipantModule from './participant/participant.module';
import UserModule from './user/user.module';
import ChatroomModule from './chatroom/chatroom.module';
import BlockModule from './block/block.module';
import FriendModule from './friend/friend.module';
import ChannelModule from './channel/channel.module';

@Module({
	imports: [
		PrismaModule,
		UserModule,
		FriendModule,
		BlockModule,
		ChatroomModule,
		ChannelModule,
		AuthModule,
		ParticipantModule,
		MuteModule,
		ChatModule,
	],
})
class ApiModule {}

export default ApiModule;
