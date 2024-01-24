import style from '../../../style/friend/add/index.module.css';
import SearchFriend from './search';
import UserBriefInformation from '@/component/common/user/bried-information';
import { Skeleton, Typography } from '@mui/material';
import User from '@/type/user.type';
import { useCallback, useState, useContext } from 'react';
// import { getFetcher } from '@/component/api/getFetcher';
// import Friend from '@/type/friend.type';
import PositionableSnackbar from '@/component/common/PositionableSnackbar';
import { deleteFetcher, postFetcher } from '@/service/api';
import Friend from '@/type/friend.type';
import Block from '@/type/block.type';
import AuthContext from '@/context/auth.context';

const Title = () => {
	return (
		<div>
			<span>친구 추가</span>
		</div>
	);
};

interface AddFriendProps {
	friendList: Friend[] | undefined;
	refetch: () => void;
	blockList: Block[] | undefined;
	blockRefetch: () => void;
}

const AddFriend = ({ friendList, refetch, blockList, blockRefetch }: AddFriendProps) => {
	const [searchData, setSearchData] = useState<User[]>([]);
	const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
	const [message, setMessage] = useState({
		title: '',
		success: true,
	});
	const [isSearching, setIsSearching] = useState(false);
	const { me } = useContext(AuthContext);

	const onSearch = async (name: string) => {
		if (name.length === 0) setSearchData([]);
		try {
			const res = await postFetcher(`/user/search?queryString=${name}`);
			setSearchData(res as any);
		} catch (error) {
			setMessage({
				title: '검색 실패',
				success: false,
			});
			setShowSuccessSnackbar(true);
		}
	};

	const setFriend = useCallback(async (id: string, mode: 'add' | 'delete') => {
		const title = mode === 'add' ? '친구 추가' : '친구 삭제';
		try {
			await (mode == 'add'
				? postFetcher('/friend', { friendId: id })
				: deleteFetcher(`/friend/${id}`));
			setMessage({
				title: title + ' 성공',
				success: true,
			});
			setShowSuccessSnackbar(true);
			refetch();
		} catch (error) {
			setMessage({
				title: title + ' 실패',
				success: false,
			});
			setShowSuccessSnackbar(true);
		}
	}, []);

	const isFriend = (id: string) => {
		return friendList?.some(friend => friend.friendId === id);
	};

	return (
		<div className={style.container}>
			<PositionableSnackbar
				open={showSuccessSnackbar}
				onClose={() => setShowSuccessSnackbar(false)}
				message={message.title}
				success={message.success}
				position={'bottom'}
			/>
			<div className={style['add-container']}>
				<Title />
				<SearchFriend
					onSearch={onSearch}
					isSearching={isSearching}
					setIsSearching={setIsSearching}
				/>
			</div>
			{!isSearching ? (
				<></>
			) : !searchData || !searchData.length ? (
				<Typography>유저가 없습니다.</Typography>
			) : (
				<div className={style['user-container']}>
					{searchData.map(user => (
						<div key={user?.id}>
							<UserBriefInformation
								nickname={user?.nickname}
								className={style['user-brief-information']}
								userId={user?.id}
								imgUrl={user?.profileImageURI}
								refetch={refetch}
								blockRefetch={blockRefetch}
							/>
							{me?.id !== user.id &&
								(blockList?.find(item => item.blockedId === user.id) ? (
									<div>차단된 유저</div>
								) : isFriend(user.id) ? (
									<button onClick={() => setFriend(user.id, 'delete')}>삭제</button>
								) : (
									<button onClick={() => setFriend(user.id, 'add')}>추가</button>
								))}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AddFriend;
