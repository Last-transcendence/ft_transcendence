import { Module } from '@nestjs/common';
import UserService from '../user/user.service';
import BlockService from 'api/block/block.service';
import InviteGateway from './invite.gateway';
import ChannelService from 'api/channel/channel.service';
import MuteService from 'api/mute/mute.service';
@Module({
	providers: [UserService, BlockService, InviteGateway, ChannelService, MuteService],
})
class InviteModule {}

export default InviteModule;