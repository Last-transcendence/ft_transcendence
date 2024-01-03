import {Injectable} from '@nestjs/common';
import {$Enums} from '@prisma/client';
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

	async createChannel(title: string, visibility: $Enums.ChannelVisibility, 
						password: string | null): Promise< ChannelModel>
	{
		try {
			return await this.prismaService.channel.create({
				data: {title, visibility, password},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async updateChannel(id: string, 
						updateChannelDto: Dto.Request.Update.PartialChannel)
	{
		try {
			return await this.prismaService.channel.update({
				where : {id},
				data : updateChannelDto,
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChannelService;
