export enum UserStatus {
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
	PLAYING = 'PLAYING',
}

interface User {
	id: string;
	nickname: string;
	profileImageURI: string | undefined;
	status: UserStatus;
}

export default User;
