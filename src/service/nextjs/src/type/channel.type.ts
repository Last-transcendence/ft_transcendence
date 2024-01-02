import User from '@/type/user.type';

export enum ChannelVisibility {
	PUBLIC = 'public',
	PROTECTED = 'protected',
	PRIVATE = 'private',
}

export enum ParticipantRole {
	OWNER,
	ADMIN,
	USER,
}

interface Channel {
	id: string;
	title: string;
	visibility: ChannelVisibility;
	password?: string | null;
	createdAt: Date;
	updatedAt: Date;
	// Related with
	participants: Participant[];
	bans: Ban[];
	mutes: Mute[];
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

interface Participant extends CommonInterface {
	role: ParticipantRole;
}

interface Ban extends CommonInterface {}

interface Mute extends CommonInterface {}
