import { Module } from '@nestjs/common';
import ChatRoomController from './chatroom.controller';
import ChatRoomService from './chatroom.service';
import UserService from '../user/user.service';
import BlockService from 'api/block/block.service';
import ChatService from 'api/chat/chat.service';
import ChatRoomGateway from './chatroom.gateway';
import MuteService from 'api/mute/mute.service';
import BlockModule from 'api/block/block.module';
@Module({
	imports: [BlockModule],
	controllers: [ChatRoomController],
	providers: [
		ChatRoomService,
		UserService,
		BlockService,
		ChatService,
		ChatRoomGateway,
		MuteService,
	],
	exports: [ChatRoomService],
})
class ChatRoomModule {}

export default ChatRoomModule;
