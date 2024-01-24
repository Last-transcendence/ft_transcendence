import { BadRequestException, Inject, Req, UseGuards, forwardRef } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import * as Auth from '../../common/auth';
import * as InviteDto from './dto';
import BlockService from 'api/block/block.service';
import UserService from 'api/user/user.service';
import ChannelService from 'api/channel/channel.service';

const getCorsOrigin = () => {
	const configService = new ConfigService();

	return configService.getOrThrow('NEXTJS_URL');
};

@WebSocketGateway({
	namespace: '/socket/invite',
	cors: { origin: getCorsOrigin(), credentials: true },
})
@UseGuards(Auth.Guard.UserWsJwt)
class InviteGateway {
    constructor(
		private readonly blockService: BlockService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => ChannelService))
        private readonly channelService: ChannelService,
	) {}

    @WebSocketServer()
	server: Namespace;

	handleConnection() {
		console.log('Client connected to invite namespace');
	}

    @SubscribeMessage('join')
	async handlenoti(
		@ConnectedSocket() socket,
	) {
		try {
			socket.join('invite');
			return { res: true };
		} catch (error) {
			console.error("An error occurred invite.gateway 'join':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false };
		}
	}

	@SubscribeMessage('invite')
	async handleInviteMessage(  
		@MessageBody() messageDto: InviteDto.Request.Invite,
		@ConnectedSocket() socket,
	) {
		try {
			const userId: string = socket.user.id;
			const destId: string = messageDto.destId;
            const destUser = await this.userService.findByNickname(destId);
            if (!destUser) {
                throw new BadRequestException('destUser not found');
            }
            const channelInfo = await this.channelService.getChannel(messageDto.channelId);
            if (!channelInfo) {
                throw new BadRequestException('channel not found');
            }
			const isBlocked = await this.blockService.find(userId, destId);
			if (isBlocked) {
				throw new BadRequestException('Blocked user');
			}

			socket.to('invite').emit('invite', {
				srcId: userId,
				destId: destId,
				destNickname: socket.user.nickname,
                channelId: messageDto.channelId,
                channelTitle: channelInfo.title,
            });
			return { res: true };
		} catch (error) {
			console.error("An error occurred invite.gateway 'message':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false };
		}
	}
}

export default InviteGateway;