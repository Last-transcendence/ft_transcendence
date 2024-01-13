import UserBriefInformation from '@/component/common/user/bried-information';
import style from '../../../style/friend/list/index.module.css';
import FriendStatus from './status';
import User from '@/type/user.type';
import useFetchData from '@/hook/useFetchData';
import { Skeleton } from '@mui/material';

const Title = () => {
	return (
		<div>
			<span>친구 목록</span>
		</div>
	);
};

const FriendList = () => {
	const { data, isLoading } = useFetchData<User[]>('/friend');

	if (isLoading) return <Skeleton />;

	return (
		<div className={style.container}>
			<Title />
			{data && data?.length ? (
				data.map((user: User) => {
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
				})
			) : (
				<div>친구가 없습니다.</div>
			)}
		</div>
	);
};

export default FriendList;
