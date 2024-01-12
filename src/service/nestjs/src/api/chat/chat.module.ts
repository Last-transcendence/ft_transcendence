import { Module } from '@nestjs/common';
import ChatService from './chat.service';
import ChatController from './chat.controller';
import ChatRoomModule from 'api/chatroom/chatroom.module';

@Module({
	imports: [ChatRoomModule],
	providers: [ChatService],
	controllers: [ChatController],
})
class ChatModule {}

export default ChatModule;
