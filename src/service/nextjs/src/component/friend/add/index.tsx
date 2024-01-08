import style from '../../../style/friend/add/index.module.css';
import SearchFriend from './search';
import UserBriefInformation from '@/component/common/user/bried-information';
import { Skeleton } from '@mui/material';
import User, { UserStatus } from '@/type/user.type';
import { useState } from 'react';
// import { getFetcher } from '@/component/api/getFetcher';
// import Friend from '@/type/friend.type';
import CustomSnackbar from '@/component/profile/modifyProfile/customSnackbar';
import { postFetcher } from '../../../../service/api';

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

// const removeFriend = () => {
// 	alert('친구 삭제');
// };

const AddFriend = () => {
	const [searchData, setSearchData] = useState<User[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [message, setMessage] = useState({
		title: '',
		success: true,
	});
	const onSearch = (name: string) => {
		if (isLoading) return;
		if (name.length === 0) setSearchData([]);
		setSearchData(dummyUsers);
		//@todo api test
		// try {
		// 	setLoading(true);
		// 	const res = await api.post(`/user/search?queryString=${name}`);
		// 	setSearchData(res.data);
		// 	setLoading(false);
		// } catch (error) {
		// 	console.error('Error fetching data:', error);
		// 	setLoading(false);
		// }
	};

	if (isLoading) return <Skeleton />;
	if (!searchData) return <div>유저가 없습니다.</div>;

	const addFriend = async (id: string) => {
		try {
			await postFetcher('/friend', { friendId: id });
			setMessage({
				title: '친구 추가 성공',
				success: true,
			});
			setShowSuccessSnackbar(true);
		} catch (error) {
			setMessage({
				title: '친구 추가 실패',
				success: false,
			});
			setShowSuccessSnackbar(true);
		}
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
			) : !searchData ? (
				<>데이터가 없습니다</>
			) : (
				<div className={style['user-container']}>
					{searchData?.map(user => (
						<div key={user.id}>
							<UserBriefInformation
								profileImageSrc={user?.profileImageURI}
								nickname={user?.nickname}
								className={style['user-brief-information']}
							/>
							<button onClick={() => addFriend(user.id)}>추가</button>
							{/*{v?.condition === '친구' ? (*/}
							{/*	<Button variant={'contained'} size={'small'} onClick={() => removeFriend()}>*/}
							{/*		삭제*/}
							{/*	</Button>*/}
							{/*) : (*/}
							{/*	<Button variant={'contained'} size={'small'} onClick={() => addFriend()}>*/}
							{/*		추가*/}
							{/*	</Button>*/}
							{/*)}*/}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AddFriend;
