import User, { UserStatus } from '@/type/user.type';
import { getFetcher } from './api';
import Friend from '@/type/friend.type';

async function getFriend(): Promise<Friend[]> {
	return await getFetcher<Friend[]>('/friend').then(response => {
		return response;
	});
}

export default getFriend;
