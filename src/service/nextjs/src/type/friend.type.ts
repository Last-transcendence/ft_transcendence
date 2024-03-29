import { UserStatus } from '@/type/user.type';

type Friend = {
	id: string;
	userId: string;
	friendId: string;
	nickname: string;
	profileImageURI: string | null;
	status: UserStatus;
};

export default Friend;
