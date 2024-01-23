import { Injectable } from '@nestjs/common';
import { ChatRoomModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class ChatRoomService {
	constructor(private readonly prismaService: PrismaService) {}

	async get(srcId: string): Promise<ChatRoomModel[]> {
		try {
			return await this.prismaService.chatRoom.findMany({
				where: { srcId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getDestIdById(chatRoomId: string): Promise<ChatRoomModel> {
		try {
			return await this.prismaService.chatRoom.findUnique({
				where: { id: chatRoomId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(srcId: string, destId: string): Promise<ChatRoomModel> {
		try {
			await this.prismaService.chatRoom.create({
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

	async find(srcId: string, destId: string): Promise<ChatRoomModel> {
		try {
			return await this.prismaService.chatRoom.findFirst({
				where: { srcId, destId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChatRoomService;
