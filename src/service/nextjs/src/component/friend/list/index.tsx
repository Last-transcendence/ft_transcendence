import UserBriefInformation from '@/component/common/user/bried-information';
import style from '../../../style/friend/list/index.module.css';
import FriendStatus from './status';
import User, { UserStatus } from '@/type/user.type';
import useFetchData from '@/hook/useFetchData';
import { Skeleton } from '@mui/material';
import Friend from '@/type/friend.type';

const Title = () => {
	return (
		<div>
			<span>친구 목록</span>
		</div>
	);
};

const FriendList = ({ data }: { data: Friend[] | undefined }) => {
	return (
		<div className={style.container}>
			<Title />
			{data && data?.length ? (
				data.map((user: Friend) => {
					return (
						<div key={user.id}>
							{/*@todo 문자제거.*/}
							<UserBriefInformation
								nickname={'친구'}
								condition={<FriendStatus status={UserStatus.ONLINE} />}
								className={style['user-brief-information']}
								userId={user.id}
							/>
						</div>
					);
				})
			) : (
				<div>친구가 없습니다.</div>
			)}
		</div>
	);
};

export default FriendList;
