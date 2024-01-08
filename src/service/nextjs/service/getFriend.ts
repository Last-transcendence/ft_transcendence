import User, { UserStatus } from '@/type/user.type';
import { getFetcher } from './api';

const DummyFriend: User[] = [
	{
		id: '1',
		nickname: 'test1',
		profileImageURI: 'https://via.placeholder.com/1',
		status: UserStatus.ONLINE,
	},
	{
		id: '2',
		nickname: 'test2',
		profileImageURI: 'https://via.placeholder.com/2',
		status: UserStatus.OFFLINE,
	},
	{
		id: '3',
		nickname: 'test3',
		profileImageURI: 'https://via.placeholder.com/3',
		status: UserStatus.ONLINE,
	},
	{
		id: '4',
		nickname: 'test4',
		profileImageURI: 'https://via.placeholder.com/4',
		status: UserStatus.OFFLINE,
	},
	{
		id: '5',
		nickname: 'test5',
		profileImageURI: 'https://via.placeholder.com/5',
		status: UserStatus.ONLINE,
	},
	{
		id: '6',
		nickname: 'test6',
		profileImageURI: 'https://via.placeholder.com/6',
		status: UserStatus.OFFLINE,
	},
	{
		id: '7',
		nickname: 'test7',
		profileImageURI: 'https://via.placeholder.com/7',
		status: UserStatus.ONLINE,
	},
	{
		id: '8',
		nickname: 'test8',
		profileImageURI: 'https://via.placeholder.com/8',
		status: UserStatus.OFFLINE,
	},
	{
		id: '9',
		nickname: 'test9',
		profileImageURI: 'https://via.placeholder.com/9',
		status: UserStatus.ONLINE,
	},
	{
		id: '10',
		nickname: 'test10',
		profileImageURI: 'https://via.placeholder.com/10',
		status: UserStatus.OFFLINE,
	},
	{
		id: '11',
		nickname: 'test11',
		profileImageURI: 'https://via.placeholder.com/11',
		status: UserStatus.ONLINE,
	},
	{
		id: '12',
		nickname: 'test12',
		profileImageURI: 'https://via.placeholder.com/12',
		status: UserStatus.OFFLINE,
	},
	{
		id: '13',
		nickname: 'test13',
		profileImageURI: 'https://via.placeholder.com/13',
		status: UserStatus.ONLINE,
	},
];

async function getFriend(): Promise<User[]> {
	return await getFetcher<User[]>('/api/friend').then(response => {
		return DummyFriend;
		return response;
	});
}

export default getFriend;
