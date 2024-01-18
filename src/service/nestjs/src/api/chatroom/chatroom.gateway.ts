import { BadRequestException, Inject, UseGuards, forwardRef } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import ChatRoomService from './chatroom.service';
import * as Auth from '../../common/auth';
import * as ChatRoomDto from './dto';
import * as ParticipantDto from '../participant/dto';
import ParticipantService from 'api/participant/participant.service';
import { join } from 'path';

const getCorsOrigin = () => {
    const configService = new ConfigService();

    return configService.getOrThrow('NEXTJS_URL');
};

@WebSocketGateway({
    namespace: '/socket/chatroom',
    cors: { origin: getCorsOrigin(), credentials: true },
})
class ChatRoomGateway {
    constructor(
        private readonly chatRoomService: ChatRoomService,
        @Inject(forwardRef(() => ParticipantService))
		private readonly participantService: ParticipantService,
    ) {}

    @WebSocketServer()
    server: Server;

    handleConnection() {
        console.log('Client connected to chatroom namespace');
    }

    @SubscribeMessage('create')
    @UseGuards(Auth.Guard.UserWsJwt)
    async handleCreate(
        @MessageBody() createChatRoomDto: ChatRoomDto.Request.Create,
        @ConnectedSocket() socket: Socket,
    ) {
        try {
            const userId: string = socket.data.user.id;
            const destId: string = createChatRoomDto.destId;
            const newChatRoom = await this.chatRoomService.create(userId, destId);
            socket.join(newChatRoom.id);
            return { res: true, chatRoomId: newChatRoom.id };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @SubscribeMessage('join')
    @UseGuards(Auth.Guard.UserWsJwt)
    async handleJoin(
        @MessageBody() joinChatRoomDto: ParticipantDto.Request.Create,
        @ConnectedSocket() socket: Socket,
    ) {
        try {
            const userId: string = socket.data.user .id;
            
            if (await this.participantService.isParticipated(userId)) {
                throw new BadRequestException('User is already participated');
            }
            // 수 정
            const chatRoom = await this.chatRoomService.find(userId, joinChatRoomDto.channelId);
            if (!chatRoom){
                throw new BadRequestException('ChatRoom is not exist');
            }
            
            socket.join(joinChatRoomDto.channelId);
            return { res: true };
        } catch (error) {
            console.error("An error occurred chatRoom.gateway 'join':", error);
			socket.emit('error', { message: 'An error occurred' });
			return { res: false };
        }
    }
}

export default ChatRoomGateway;