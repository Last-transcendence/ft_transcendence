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
	userId: string;
	nickname: string;
	profileImageURI: string;
}

export interface Participant extends CommonInterface {
	id: string;
	userId: string;
	role: string;
	user: User;
}

export interface Ban extends CommonInterface {}

export interface Mute {
	id?: string;
	userId: string;
}

export type AdminActionType = 'kick' | 'ban' | 'mute' | 'admin';
export type ChannelSocketResponse = {
	channelId: string;
	userId: string;
	nickname: string;
};
