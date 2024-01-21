import { Module } from '@nestjs/common';
import ChatRoomController from './chatroom.controller';
import ChatRoomService from './chatroom.service';
import UserService from '../user/user.service';
import BlockService from 'api/block/block.service';
import ChatService from 'api/chat/chat.service';
@Module({
	controllers: [ChatRoomController],
	providers: [ChatRoomService, UserService, BlockService, ChatService],
	exports: [ChatRoomService],
})
class ChatRoomModule {}

export default ChatRoomModule;
