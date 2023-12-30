import UserBriefInformation from '@/component/common/user/bried-information';
import style from '../../../style/friend/list/index.module.css';
import FriendStatus from './status';
// import { useEffect, useState } from 'react';
// import { getFetcher } from '@/component/api/getFetcher';
import User, { UserStatus } from '@/type/user.type';
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
		intraId: 'john_doe',
		nickname: 'John Doe',
		profileImageURI: 'https://example.com/john_doe.jpg',
		email2fa: 'john@example.com',
		use2fa: true,
		status: UserStatus.ONLINE,
	},
	{
		id: '2',
		intraId: 'jane_smith',
		nickname: 'Jane Smith',
		profileImageURI: undefined,
		email2fa: 'jane@example.com',
		use2fa: false,
		status: UserStatus.OFFLINE,
	},
];

const FriendList = () => {
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
							profileImageSrc={user?.profileImageURI}
							nickname={user?.nickname}
							condition={<FriendStatus status={user?.status} />}
							className={style['user-brief-information']}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default FriendList;
