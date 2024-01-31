import { Injectable } from '@nestjs/common';
import { MuteModel } from 'common/model';
import PrismaService from 'common/prisma/prisma.service';

@Injectable()
class MuteService {
	constructor(private readonly prismaService: PrismaService) {}

	async getMuteList(channelId: string): Promise<MuteModel[]> {
		try {
			return await this.prismaService.mute.findMany({
				where: { channelId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async muteUser(channelId: string, userId: string): Promise<MuteModel> {
		try {
			const mute = await this.prismaService.mute.findFirst({
				where: { channelId, userId },
			});

			if (mute) {
				return await this.prismaService.mute.update({
					where: { id: mute.id },
					data: { updatedAt: new Date() },
				});
			}

			return await this.prismaService.mute.create({
				data: { channelId, userId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async unmuteUser(channelId: string, userId: string): Promise<MuteModel> {
		try {
			const muteRecord = await this.prismaService.mute.findFirst({
				where: {
					channelId: channelId,
					userId: userId,
				},
			});

			if (!muteRecord) {
				return null;
			}

			return await this.prismaService.mute.delete({
				where: {
					id: muteRecord.id,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async isMuted(channelId: string, userId: string): Promise<boolean> {
		try {
			let mute = await this.prismaService.mute.findFirst({
				where: { channelId, userId },
			});

			if (mute && 300000 < new Date().getTime() - mute.updatedAt.getTime()) {
				mute = await this.prismaService.mute.delete({
					where: { id: mute.id },
				});
				return false;
			}

			if (!mute) {
				return false;
			}

			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default MuteService;
