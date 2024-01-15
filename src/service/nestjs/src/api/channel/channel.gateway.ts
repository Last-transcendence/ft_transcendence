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
import * as Auth from '../../common/auth';
import ChannelService from './channel.service';
import * as Dto from './dto';

@WebSocketGateway({ namespace: 'socket/channel' })
class ChannelGateway {
	constructor(
		private readonly channelService: ChannelService,
		@Inject(forwardRef(() => ParticipantService))
		private readonly participantService: ParticipantService,
	) {}

	@WebSocketServer()
	server: Server;

	handleConnection() {
		console.log('Client connected to room namespace');
	}

	@SubscribeMessage('create')
	@UseGuards(Auth.Guard.UserJwtWs)
	async handleCreate(
		@MessageBody() createChannelDto: Dto.Request.Create,
		@ConnectedSocket() socket: Socket,
	) {
		try {
			const newChannel = await this.channelService.createChannel(createChannelDto);
			const newParticipant = await this.participantService.create(
				newChannel.id,
				socket.data.user.id,
			);

			await this.participantService.update(newParticipant.id, { role: 'OWNER' });

			socket.join(newChannel.id);
			return { res: true, channelId: newChannel.id };
		} catch (error) {
			console.error("An error occurred channel.gateway 'create':", error);
			socket.emit('error', { message: "An error occurred channel.gateway 'create'" });
			return { res: false };
		}
	}
}

export default ChannelGateway;
