import { Module } from '@nestjs/common';
import ChatRoomController from './chatroom.controller';
import ChatRoomService from './chatroom.service';

@Module({
	controllers: [ChatRoomController],
	providers: [ChatRoomService],
	exports: [ChatRoomService],
})
class ChatRoomModule {}

export default ChatRoomModule;
