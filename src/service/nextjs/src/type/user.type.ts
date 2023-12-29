export enum UserStatus {
	ONLINE,
	OFFLINE,
	PLAYING,
}

type User = {
	id: string;
	intraId: string;
	nickname: string;
	// TODO: ? or null or undefined
	profileImageURI: string | undefined;
	email2fa: string | undefined;
	use2fa: boolean;
	status: UserStatus;
};

export default User;
