import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import ParticipantService from 'api/participant/participant.service';
import { Server, Socket } from 'socket.io';
import ChannelService from './channel.service';
import * as Dto from './dto';
import * as Auth from '../../common/auth';
import { ConfigService } from '@nestjs/config';

const getCorsOrigin = () => {
	const configService = new ConfigService();

	return configService.getOrThrow('NEXTJS_URL');
};

@WebSocketGateway({
	namespace: '/socket/channel',
	cors: { origin: getCorsOrigin(), credentials: true },
})
class ChannelGateway {
	constructor(
		private readonly channelService: ChannelService,
		@Inject(forwardRef(() => ParticipantService))
		private readonly participantService: ParticipantService,
	) {}

	@WebSocketServer()
	server: Server;

	handleConnection() {
		console.log('Client connected to channel namespace');
	}

	@SubscribeMessage('create')
	@UseGuards(Auth.Guard.UserWsJwt)
	async handleMessage(
		@MessageBody() createChannelDto: Dto.Request.Create,
		@ConnectedSocket() socket: Socket,
	) {
		const newChannel = await this.channelService.createChannel(createChannelDto);
		const newParticipant = await this.participantService.create(newChannel.id, socket.data.user.id);

		await this.participantService.update(newParticipant.id, { role: 'OWNER' });

		socket.join(newChannel.id);
	}
}

export default ChannelGateway;
