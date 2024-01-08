import { Injectable } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from '../dto';

@Injectable()
class ParticipantService {
	constructor(private readonly prismaService: PrismaService) {}

	async getParticipantList(channelId: string): Promise<Dto.Response.Participant[]> {
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

export default ParticipantService;
