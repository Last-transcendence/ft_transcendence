import style from '../../../style/friend/add/index.module.css';
import SearchFriend from './search';
import UserBriefInformation from '@/component/common/user/bried-information';
import { Skeleton } from '@mui/material';
import User, { UserStatus } from '@/type/user.type';
import { useState } from 'react';
// import { getFetcher } from '@/component/api/getFetcher';
// import Friend from '@/type/friend.type';
import CustomSnackbar from '@/component/profile/modifyProfile/customSnackbar';
import { deleteFetcher, postFetcher } from '@/service/api';
import Friend from '@/type/friend.type';

const Title = () => {
	return (
		<div>
			<span>친구 추가</span>
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

const AddFriend = ({ friendList }: { friendList: Friend[] | undefined }) => {
	const [searchData, setSearchData] = useState<User[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [message, setMessage] = useState({
		title: '',
		success: true,
	});

	const onSearch = async (name: string) => {
		if (isLoading) return;
		if (name.length === 0) setSearchData([]);
		//@todo api test
		try {
			setLoading(true);
			const res = await postFetcher(`/user/search?queryString=${name}`);
			setSearchData(res as any);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	};

	if (isLoading) return <Skeleton />;

	const setFriend = async (id: string, mode: 'add' | 'delete') => {
		const title = mode === 'add' ? '친구 추가' : '친구 삭제';

		try {
			await (mode === 'add'
				? postFetcher('/friend', { friendId: id })
				: deleteFetcher(`/friend/${id}`));
			setMessage({
				title: title + ' 성공',
				success: true,
			});
			setShowSuccessSnackbar(true);
		} catch (error) {
			setMessage({
				title: title + ' 실패',
				success: false,
			});
			setShowSuccessSnackbar(true);
		}
	};

	const isFriend = (id: string) => {
		return friendList?.some(friend => friend.friendId === id);
	};

	return (
		<div className={style.container}>
			<CustomSnackbar
				open={showSuccessSnackbar}
				onClose={() => setShowSuccessSnackbar(false)}
				message={message.title}
				success={message.success}
				position={'bottom'}
			/>
			<div className={style['add-container']}>
				<Title />
				<SearchFriend onSearch={onSearch} />
			</div>
			{isLoading ? (
				<Skeleton />
			) : !searchData || !searchData.length ? (
				<div>유저가 없습니다.</div>
			) : (
				<div className={style['user-container']}>
					{searchData.map(user => (
						<div key={user.id}>
							<UserBriefInformation
								nickname={user?.nickname}
								className={style['user-brief-information']}
								userId={user.id}
							/>
							{isFriend(user.id) ? (
								<button onClick={() => setFriend(user.id, 'add')}>삭제</button>
							) : (
								<button onClick={() => setFriend(user.id, 'delete')}>추가</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AddFriend;
