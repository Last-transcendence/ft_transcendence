import { Ban, ChannelVisibility, Mute, Participant } from '@/type/channel.type';

export interface ChannelInfo {
	title: string;
	visibility: ChannelVisibility;
	participant: Participant[];
	mute: Mute[];
}
