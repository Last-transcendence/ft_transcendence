import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MessageBody } from '@nestjs/websockets';
import { $Enums } from '@prisma/client';
import MuteService from 'api/mute/mute.service';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import ParticipantModel from 'common/model/participant.model';
import PrismaService from 'common/prisma/prisma.service';
import { Socket } from 'socket.io';
import * as Dto from './dto';

@Injectable()
class ChannelService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(forwardRef(() => MuteService))
		private readonly muteService: MuteService,
	) {}

	async getChannelList(): Promise<Dto.Response.Channel[]> {
		try {
			return await this.prismaService.channel.findMany({
				select: {
					id: true,
					title: true,
					visibility: true,
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getChannel(id: string): Promise<{
		id;
		title: string;
		visibility: $Enums.ChannelVisibility;
		participant: Array<{
			id: string;
			userId: string;
		}>;
		mute: Array<{
			id: string;
			userId: string;
		}>;
	} | null> {
		try {
			return await this.prismaService.channel.findUnique({
				where: { id },
				select: {
					id: true,
					title: true,
					visibility: true,
					participant: {
						select: {
							id: true,
							userId: true,
							role: true,
							user: {
								select: {
									nickname: true,
									profileImageURI: true,
								},
							},
						},
					},
					mute: {
						select: {
							id: true,
							userId: true,
						},
					},
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createChannel(data): Promise<Dto.Response.Channel> {
		try {
			const createRequestDto = plainToClass(Dto.Request.Create, data);
			const error = await validate(createRequestDto);

			createRequestDto.password = await bcrypt.hash(createRequestDto.password, 10);

			if (0 < error.length) {
				throw new Error('Failed validation: ' + JSON.stringify(error));
			}

			return await this.prismaService.channel.create({
				data: { ...createRequestDto },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async editChannel(@MessageBody() data) {
		try {
			const { channelId, ...updateData } = data;

			updateData.password = await bcrypt.hash(updateData.password, 10);

			return await this.prismaService.channel.update({
				where: { id: channelId },
				data: updateData,
				select: {
					id: true,
					updatedAt: true,
				},
			});
		} catch (error) {
			throw new Error('Failed to update channel info: ' + error.message);
		}
	}

	async joinCheck(socket: Socket, channelId: string, userId: string) {
		try {
			const participant = await this.prismaService.participant.findFirst({
				where: { userId: userId },
			});

			if (!participant || channelId === participant.channelId) {
				return;
			}

			socket.leave(participant.channelId);

			return await this.prismaService.participant.delete({
				where: { id: participant.id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async leaveChannel(socket: Socket, userId: string): Promise<ParticipantModel> {
		try {
			const participant = await this.prismaService.participant.findFirst({
				where: { userId },
			});
			if (!participant) {
				return null;
			}

			socket.leave(participant.channelId);

			return await this.prismaService.participant.delete({
				where: { id: participant.id },
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async validatePassword(id: string, password: string): Promise<boolean> {
		try {
			const channel = await this.prismaService.channel.findUnique({
				where: { id },
			});

			return await bcrypt.compare(password, channel.password);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async messageFilter(channelId: string, userId: string, message: string): Promise<string> {
		const muteList = await this.muteService.getMuteList(channelId);
		const isUserMuted = muteList.some(item => item.userId === userId);

		if (isUserMuted) {
			return 'This message is from a muted user';
		}
		
		return message;
	}

	async deleteEmptyChannel(): Promise<void> {
		try {
			const emptyChannelList = await this.prismaService.channel.findMany({
				where: { participant: { none: {} } },
			});

			for (const channel of emptyChannelList) {
				const existingChannel = await this.prismaService.channel.findFirst({
					where: { id: channel.id },
				});

				if (existingChannel) {
					await this.prismaService.channel.delete({
						where: { id: channel.id },
					});
				}
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getParticipants(channelId: string): Promise<Dto.Response.Participant[]> {
		try {
			return await this.prismaService.participant.findMany({
				where: { channelId },
				select: {
					id: true,
					userId: true,
					role: true,
					user: {
						select: {
							nickname: true,
							profileImageURI: true,
						},
					},
				},
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export default ChannelService;
