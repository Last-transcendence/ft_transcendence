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
import * as ChatRoomDto from './dto';
import ChatRoomService from './chatroom.service';
import ChatService from 'api/chat/chat.service';
import BlockService from 'api/block/block.service';

const getCorsOrigin = () => {
	const configService = new ConfigService();

	return configService.getOrThrow('NEXTJS_URL');
};

@WebSocketGateway({
	namespace: '/socket/chatroom',
	cors: { origin: getCorsOrigin(), credentials: true },
})
@UseGuards(Auth.Guard.UserWsJwt)
class ChatRoomGateway {
	constructor(
		private readonly chatRoomService: ChatRoomService,
		@Inject(forwardRef(() => ChatService))
		private readonly chatService: ChatService,
		@Inject(forwardRef(() => BlockService))
		private readonly blockService: BlockService,
	) {}

	@WebSocketServer()
	server: Namespace;

	handleConnection() {
		console.log('Client connected to chatroom namespace');
	}

	@SubscribeMessage('join')
	async handleJoin(
		@MessageBody() joinChatRoomDto: ChatRoomDto.Request.Create,
		@ConnectedSocket() socket,
	) {
		try {
			const userId: string = socket.user.id;
			const destId: string = joinChatRoomDto.destId;
			const chatRoom = await this.chatRoomService.find(userId, destId);
			if (!chatRoom){
				await this.chatRoomService.create(userId, destId);
			}
			const chatRoomName = [userId, destId].sort().join('_');
			socket.join(chatRoomName);
			return { res: true };
		} catch (error) {
			console.error("An error occurred chatRoom.gateway 'join':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false };
		}
	}

	@SubscribeMessage('message')
	async handleMessage(
		@MessageBody() messageDto: ChatRoomDto.Request.Message,
		@ConnectedSocket() socket,
	) {
		try {
			const userId: string = socket.user.id;
			const destId: string = messageDto.destId;
			const isBlocked = await this.blockService.find(userId, destId);
			const chatRoomName = [userId, destId].sort().join('_');
			await this.chatService.create(userId, destId, messageDto.message);
			if (isBlocked) {
				socket.to(chatRoomName).emit('message', {
					srcId: userId,
					srcNickname: socket.user.nickname,
					message: messageDto.message});
			}
			return { res: true };
		} catch (error) {
			console.error("An error occurred chatRoom.gateway 'message':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false };
		}
	}
}

export default ChatRoomGateway;