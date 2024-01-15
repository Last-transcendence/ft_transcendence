import UserBriefInformation from '@/component/common/user/bried-information';
import style from '../../../style/friend/list/index.module.css';
import FriendStatus from './status';
// import { useEffect, useState } from 'react';
// import { getFetcher } from '@/component/api/getFetcher';
import User, { UserStatus } from '@/type/user.type';
import Friend from '@/type/friend.type';
// import Friend from '@/type/friend.type';
// import { Skeleton } from '@mui/material';

const Title = () => {
	return (
		<div>
			<span>친구 목록</span>
		</div>
	);
};

const dummyUsers: User[] = [
	{
		id: '1',
		nickname: 'John Doe',
		profileImageURI: 'https://example.com/john_doe.jpg',
		status: UserStatus.ONLINE,
	},
	{
		id: '2',
		nickname: 'Jane Smith',
		profileImageURI: undefined,
		status: UserStatus.OFFLINE,
	},
];

interface FriendListProps {
	data: Friend[] | undefined;
	isLoading: boolean;
}

const FriendList = ({ data, isLoading }: FriendListProps) => {
	//@todo api test
	// const [data, setData] = useState<User[]>([]);
	// const [isLoading, setLoading] = useState(false);
	// const fetchData = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const friendRes = await getFetcher('/friend');
	// 		const res = await Promise.all(
	// 			friendRes?.map(async (friend: Friend) => {
	// 				return await getFetcher(`/user/${friend.friendId}`);
	// 			}),
	// 		);
	// 		setData(res);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 		setLoading(false);
	// 	}
	// };
	//
	// useEffect(() => {
	// 	fetchData();
	// }, []);

	// if (isLoading) return <Skeleton />;
	// if (!data) return <div>친구가 없습니다.</div>;

	return (
		<div className={style.container}>
			<Title />
			{dummyUsers?.map((user: User) => {
				return (
					<div key={user.id}>
						<UserBriefInformation
							nickname={user?.nickname}
							condition={<FriendStatus status={user?.status} />}
							className={style['user-brief-information']}
							userId={user.id}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default FriendList;
