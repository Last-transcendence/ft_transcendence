import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import PrismaService from 'common/prisma/prisma.service';
import * as Dto from './dto';

@Injectable()
class ParticipantService {
	constructor(private readonly prismaService: PrismaService) {}

	async isParticipated(userId: string): Promise<boolean> {
		try {
			const participant = await this.prismaService.participant.findUnique({
				where: { userId },
			});

			if (!participant) {
				return false;
			}
			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async isAuthorized(userId: string): Promise<boolean> {
		try {
			const participant = await this.prismaService.participant.findUnique({
				where: { userId },
			});

			if (!participant || (participant.role !== 'OWNER' && participant.role !== 'ADMIN')) {
				return false;
			}
			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async isOwner(userId: string): Promise<boolean> {
		try {
			const participant = await this.prismaService.participant.findUnique({
				where: { userId },
			});

			if (!participant) {
				throw new Error('User is not participant');
			} else if (participant.role !== 'OWNER') {
				throw new Error('User is not the owner');
			}
			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async isAdmin(userId: string): Promise<boolean> {
		try {
			const participant = await this.prismaService.participant.findFirst({
				where: { userId },
			});

			if (!participant) {
				throw new Error('User is not participant');
			} else if (participant.role !== 'ADMIN') {
				throw new Error('User is not an admin');
			}
			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async get(userId: string): Promise<Dto.Response.Participant> {
		try {
			return await this.prismaService.participant.findUnique({
				where: { userId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getList(channelId: string): Promise<Dto.Response.Participant[]> {
		try {
			return await this.prismaService.participant.findMany({
				where: { channelId },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async create(createRequsetDto: Dto.Request.Create): Promise<Dto.Response.Participant> {
		try {
			const channel = await this.prismaService.channel.findUnique({
				where: { id: createRequsetDto.channelId },
			});
			if (!channel) {
				throw new NotFoundException('Channel is not found');
			}

			return await this.prismaService.participant.create({
				data: createRequsetDto,
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async update(
		id: string,
		updateParticipantDto: Dto.Request.Update,
	): Promise<Dto.Response.Participant> {
		try {
			const participant = await this.prismaService.participant.findUnique({
				where: { id },
			});
			if (!participant) {
				throw new BadRequestException('Participant not found');
			}

			return await this.prismaService.participant.update({
				where: { id },
				data: updateParticipantDto,
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async kick(id: string): Promise<Dto.Response.Participant> {
		try {
			const participant = await this.prismaService.participant.findUnique({
				where: { id },
			});
			if (!participant) {
				throw new BadRequestException('Participant not found');
			}

			return await this.prismaService.participant.delete({
				where: { id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ParticipantService;
