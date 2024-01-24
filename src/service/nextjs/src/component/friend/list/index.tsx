import UserBriefInformation from '@/component/common/user/bried-information';
import style from '../../../style/friend/list/index.module.css';
import FriendStatus from './status';
import User, { UserStatus } from '@/type/user.type';
import { Skeleton, Typography } from '@mui/material';
import Friend from '@/type/friend.type';

const Title = () => {
	return <Typography>친구 목록</Typography>;
};

const FriendList = ({ data }: { data: Friend[] | undefined }) => {
	return (
		<div className={style.container}>
			<Title />
			{data && data?.length ? (
				data.map(user => {
					return (
						<div key={user?.id}>
							{/*@todo 문자제거.*/}
							<UserBriefInformation
								nickname={user?.nickname}
								condition={<FriendStatus status={user?.status} />}
								className={style['user-brief-information']}
								userId={user?.id}
								imgUrl={user?.profileImageURI}
							/>
						</div>
					);
				})
			) : (
				<Typography>친구가 없습니다.</Typography>
			)}
		</div>
	);
};

export default FriendList;
