import User from '@/type/user.type';

export enum ChannelVisibility {
	PUBLIC = 'PUBLIC',
	PROTECTED = 'PROTECTED',
	PRIVATE = 'PRIVATE',
}

export enum ParticipantRole {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface Channel {
	id: string;
	title: string;
	visibility: ChannelVisibility;
	password?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

interface CommonInterface {
	id: string;
	channelId: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	// Refer to
	channel: Channel;
	user: User;
}

export interface Participant extends CommonInterface {
	role: ParticipantRole;
}

export interface Ban extends CommonInterface {}

export interface Mute extends CommonInterface {}
