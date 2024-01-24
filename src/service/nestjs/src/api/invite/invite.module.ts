import { Module } from '@nestjs/common';
import UserService from '../user/user.service';
import BlockService from 'api/block/block.service';
import ChatService from 'api/chat/chat.service';
import InviteGateway from './invite.gateway';
@Module({
	providers: [UserService, BlockService, ChatService, InviteGateway],
})
class InviteModule {}

export default InviteModule;