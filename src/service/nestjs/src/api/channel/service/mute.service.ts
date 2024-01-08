import { Injectable } from '@nestjs/common';
import MuteModel from 'common/model/mute.model';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from '../dto';

@Injectable()
class MuteService {
	constructor(private readonly prismaService: PrismaService) {}

	async getMuteList(channelId: string): Promise<MuteModel[]> {
		try {
			const mute = this.prismaService.mute.findMany({
				where: { channelId },
			});

			return mute;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async muteUser(
		userId: string,
		channelId: string,
		muteRequestDto: Dto.Request.Mute,
	): Promise<MuteModel> {
		try {
			const user = await this.prismaService.participant.findUnique({
				where: { channelId_userId: { channelId, userId } },
			});

			if (user.role !== 'OWNER' && user.role !== 'ADMIN') {
				throw new Error('User is not owner or admin');
			}

			return await this.prismaService.mute.create({
				data: { channelId, userId: muteRequestDto.userId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default MuteService;
