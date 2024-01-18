import { Module } from '@nestjs/common';
import ChatRoomController from './chatroom.controller';
import ChatRoomService from './chatroom.service';
import UserService from '../user/user.service';
@Module({
	controllers: [ChatRoomController],
	providers: [ChatRoomService, UserService],
	exports: [ChatRoomService],
})
class ChatRoomModule {}

export default ChatRoomModule;
