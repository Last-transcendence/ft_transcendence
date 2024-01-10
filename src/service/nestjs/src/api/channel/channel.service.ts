import { Injectable } from '@nestjs/common';
import { ChannelVisibility } from '@prisma/client';
import ChannelModel from 'common/model/channel.model';
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

	async createChannel(channelRequestDto: Dto.Request.CreateChannel): Promise<ChannelModel> {
		try {
			const title: string = channelRequestDto.title;
			const visibility: ChannelVisibility = channelRequestDto.visibility;
			const password: string = channelRequestDto.password;

			return await this.prismaService.channel.create({
				data: { title, visibility, password },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateChannel(
		id: string,
		updateChannelDto: Dto.Request.UpdateChannel,
	): Promise<Dto.Response.UpdateChannel> {
		try {
			const updateChannel = await this.prismaService.channel.update({
				where: { id },
				data: updateChannelDto,
				select: {
					id: true,
					updatedAt: true,
				},
			});
			return updateChannel;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getChannelParticipantList(channelId: string): Promise<Dto.Response.Participant[]> {
		try {
			const participant = this.prismaService.participant.findMany({
				where: { channelId },
			});

			return participant;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChannelService;
