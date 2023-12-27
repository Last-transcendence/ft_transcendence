import { Injectable } from '@nestjs/common';
import { ChatModel, ChatRoomModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class ChatRoomService {
	constructor(private readonly prismaService: PrismaService) {}

	async getChatRoom(srcId: string): Promise<ChatRoomModel[]> {
		try {
			return await this.prismaService.chatRoom.findMany({
				where: { srcId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createChatRoom(srcId: string, destId: string): Promise<ChatRoomModel> {
		try {
			this.prismaService.chatRoom.create({
				data: {
					srcId: destId,
					destId: srcId,
				},
			});

			return await this.prismaService.chatRoom.create({
				data: {
					srcId,
					destId,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getChat(srcId: string, destId: string): Promise<ChatModel[]> {
		try {
			const srcChatRoom = await this.prismaService.chatRoom.findUnique({
				where: { srcId_destId: { srcId, destId } },
			});
			const destChatRoom = await this.prismaService.chatRoom.findUnique({
				where: { srcId_destId: { srcId: destId, destId: srcId } },
			});
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

	async createChat(srcId: string, destId: string, content: string): Promise<ChatModel> {
		try {
			let chatRoom = await this.prismaService.chatRoom.findUnique({
				where: { srcId_destId: { srcId, destId } },
			});
			if (!chatRoom) {
				chatRoom = await this.createChatRoom(srcId, destId);
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

export default ChatRoomService;
