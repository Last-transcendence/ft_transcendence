import { Module } from '@nestjs/common';
import PrismaModule from 'common/prisma/prisma.module';
import AuthModule from './auth/auth.module';
import BanModule from './ban/ban.module';
import BlockModule from './block/block.module';
import ChannelModule from './channel/channel.module';
import ChatModule from './chat/chat.module';
import ChatroomModule from './chatroom/chatroom.module';
import FriendModule from './friend/friend.module';
import GameModule from './game/game.module';
import MuteModule from './mute/mute.module';
import ParticipantModule from './participant/participant.module';
import TestModule from './test/test.module';
import UserModule from './user/user.module';
import InviteModule from './invite/invite.module';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		BanModule,
		BlockModule,
		ChannelModule,
		ChatModule,
		ChatroomModule,
		FriendModule,
		GameModule,
		MuteModule,
		ParticipantModule,
		UserModule,
		TestModule,
		InviteModule,
	],
})
class ApiModule {}

export default ApiModule;
