import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { MessageBody } from '@nestjs/websockets';
import { $Enums } from '@prisma/client';
import MuteService from 'api/mute/mute.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
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

	async getChannel(id: string): Promise<{
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
			const channelDetail = await this.prismaService.channel.findUnique({
				where: { id },
				select: {
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
			return channelDetail;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createChannel(data): Promise<Dto.Response.Channel> {
		try {
			const createRequestDto = plainToClass(Dto.Request.Create, data);
			const error = await validate(createRequestDto);

			if (error.length > 0) {
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
			const updateChannelDto = plainToClass(Dto.Request.Create, data);
			const error = await validate(updateChannelDto);

			if (error.length > 0) {
				throw new Error('Failed validation: ' + JSON.stringify(error));
			}

			const id = data.channelId;
			await this.prismaService.channel.update({
				where: { id },
				data: updateChannelDto,
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

	async leaveChannel(socket: Socket, userId: string) {
		try {
			const participant = await this.prismaService.participant.findFirst({
				where: { userId: userId },
			});

			if (!participant) {
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

	async validatePassword(id: string, password: string): Promise<boolean> {
		try {
			const channel = await this.prismaService.channel.findUnique({
				where: { id },
			});

			return channel.password === password;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async messageFilter(channelId: string, userId: string, message: string): Promise<string> {
		const muteList = await this.muteService.getMuteList(channelId);
		const isUserMuted = muteList.some(item => item.userId === userId);
		if (isUserMuted) {
			return 'This message is from a muted user';
		} else {
			return message;
		}
	}
}

export default ChannelService;
