import { Injectable } from '@nestjs/common';
import ChatRoomService from 'api/chatroom/chatroom.service';
import { ChatModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class ChatService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly chatRoomService: ChatRoomService,
	) {}

	async get(srcId: string, destId: string): Promise<ChatModel[]> {
		try {
			const srcChatRoom = await this.chatRoomService.find(srcId, destId);
			const destChatRoom = await this.chatRoomService.find(destId, srcId);
			const chat = await this.prismaService.chat.findMany({
				where: { OR: [{ chatRoomId: srcChatRoom.id }, { chatRoomId: destChatRoom.id }] },
			});

			chat.sort((a, b) => {
				return a.createdAt.getTime() - b.createdAt.getTime();
			});

			return chat;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(srcId: string, destId: string, content: string): Promise<ChatModel> {
		try {
			let chatRoom = await this.prismaService.chatRoom.findFirst({
				where: { srcId, destId },
			});
			if (!chatRoom) {
				chatRoom = await this.chatRoomService.create(srcId, destId);
			}

			return await this.prismaService.chat.create({
				data: {
					chatRoomId: chatRoom.id,
					content,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChatService;
