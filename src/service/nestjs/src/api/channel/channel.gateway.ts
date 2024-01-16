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
	async handleMessage(
		@MessageBody() createChannelDto: Dto.Request.Create,
		@ConnectedSocket() socket: Socket,
	) {
		const newChannel = await this.channelService.createChannel(createChannelDto);
		const newParticipant = await this.participantService.create(newChannel.id, socket.data.user.id);

		await this.participantService.update(newParticipant.id, { role: 'OWNER' });

		socket.join(newChannel.id);
	}

	@SubscribeMessage('edit')
	@UseGuards(Auth.Guard.UserJwtWs)
	async handleEdit(@MessageBody() data, @ConnectedSocket() socket: Socket) {
		try {
			this.channelService.editChannel(data);
			return { res: true };
		} catch (error) {

			console.error("An error occurred in channel.gateway 'edit':", error);
			socket.emit('error', { message: "An error occurred in channel.gateway 'edit'" });
			return { res: false };
		}
	}
}

export default ChannelGateway;
