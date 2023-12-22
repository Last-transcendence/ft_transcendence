import style from '../../../style/friend/add/index.module.css';
import SearchFriend from './search';
import FriendStatus, { statusType } from '@/component/friend/list/status';
import UserBriefInformation from '@/component/common/user/bried-information';
import { Button } from '@mui/material';

const Title = () => {
	return (
		<div>
			<span>친구 추가</span>
		</div>
	);
};

const AddFriend = () => {
	const friendList = [
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
		{ profileImageSrc: null, nickName: '친구인사람', condition: '친구' },
	];

	const removeFriend = () => {
		alert('친구 삭제');
	};

	const addFriend = () => {
		alert('친구 추가');
	};

	return (
		<div className={style.container}>
			<div className={style['add-container']}>
				<Title />
				<SearchFriend />
			</div>
			<div className={style['user-container']}>
				{friendList?.map((v, index) => (
					<div key={index}>
						<UserBriefInformation
							profileImageSrc={v.profileImageSrc}
							nickName={v.nickName}
							condition={<FriendStatus status={(v?.condition ?? '') as statusType} />}
							className={style['user-brief-information']}
						/>
						{v?.condition === '친구' ? (
							<Button variant={'contained'} onClick={() => removeFriend()}>
								친구삭제
							</Button>
						) : (
							<Button variant={'contained'} onClick={() => addFriend()}>
								친구추가
							</Button>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default AddFriend;
