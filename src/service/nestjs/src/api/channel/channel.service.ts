import { Injectable } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from './dto';

@Injectable()
class ChannelService {
	constructor(private readonly prismaService: PrismaService) {}

	async getChannelList(): Promise<Dto.Response.Channel[]> {
		try {
			const channelList: Dto.Response.Channel[] = await this.prismaService.channel.findMany({
				select: {
					id: true,
					title: true,
					visibility: true,
				},
			});

			return channelList;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getChannel(id: string) {
		try {
			const channelDetail = await this.prismaService.channel.findUnique({
				where: {
					id: id,
				},
				select: {
					id: true,
					title: true,
					visibility: true,
					participant: true,
					ban: true,
					mute: true,
				},
			});
			return channelDetail;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createChannel(createRequestDto: Dto.Request.Create): Promise<Dto.Response.Channel> {
		try {
			return await this.prismaService.channel.create({
				data: { ...createRequestDto },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateChannel(
		id: string,
		updateChannelDto: Dto.Request.Update,
	): Promise<Dto.Response.UpdateChannel> {
		try {
			return await this.prismaService.channel.update({
				where: { id },
				data: updateChannelDto,
				select: {
					id: true,
					updatedAt: true,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChannelService;
