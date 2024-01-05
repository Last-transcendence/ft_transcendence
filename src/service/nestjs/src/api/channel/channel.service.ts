import { Injectable } from '@nestjs/common';
import { ChannelVisibility } from '@prisma/client';
import ChannelModel from 'common/model/channel.model';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from './dto';

@Injectable()
class ChannelService {
	constructor(private readonly prismaService: PrismaService) {}

	async getChannelList(): Promise<ChannelModel[]> {
		try {
			return await this.prismaService.channel.findMany({});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createChannel(channelRequestDto: Dto.Request.ChannelDto): Promise<ChannelModel> {
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

	async updateChannel(id: string, updateChannelDto: Dto.Request.Channel.Update.PartialChannel) {
		try {
			return await this.prismaService.channel.update({
				where: { id },
				data: updateChannelDto,
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChannelService;
