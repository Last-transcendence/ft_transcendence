export enum UserStatus {
	ONLINE,
	OFFLINE,
	PLAYING,
}

interface User {
	id: string;
	nickname: string;
	profileImageURI: string | undefined;
	status: UserStatus;
}

export default User;
