import { Module } from '@nestjs/common';
import BlockController from './block.controller';
import BlockService from './block.service';
import ChatRoomService from 'api/chatroom/chatroom.service';

@Module({
	controllers: [BlockController],
	providers: [BlockService, ChatRoomService],
})
class BlockModule {}

export default BlockModule;
