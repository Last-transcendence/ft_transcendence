import { Module } from '@nestjs/common';
import ChatRoomController from './chatroom.controller';
import ChatRoomService from './chatroom.service';
import UserService from '../user/user.service';
import BlockService from 'api/block/block.service';
import ChatService from 'api/chat/chat.service';
import ChatRoomGateway from './chatroom.gateway';
@Module({
	controllers: [ChatRoomController],
	providers: [ChatRoomService, UserService, BlockService, ChatService, ChatRoomGateway],
	exports: [ChatRoomService],
})
class ChatRoomModule {}

export default ChatRoomModule;
