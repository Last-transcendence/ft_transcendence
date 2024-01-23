import useFetchData from '@/hook/useFetchData';
import User from '@/type/user.type';
import { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import { Stack } from '@mui/material';
import style from '@/style/friend/list/index.module.css';
import UserBriefInformation from '@/component/common/user/bried-information';

interface PrivateParticipantListProps {
	id?: string;
}

const PrivateParticipantList = ({ id }: PrivateParticipantListProps) => {
	const { data: otherUserData } = useFetchData<User>(id ? `/user/${id}` : null);
	const { me } = useContext(AuthContext);

	return (
		<div>
			{/*채널이 protected일때만 비밀번호 변경 보임*/}
			<Stack justifyContent={'space-between'} height={'100cqh'}>
				<div className={style.container}>
					<div>참여 목록</div>
					<div>
						<Stack gap={1}>
							{me && (
								<UserBriefInformation
									nickname={me?.nickname}
									condition={me?.status}
									className={style['user-brief-information']}
									userId={me?.id}
									imgUrl={me?.profileImageURI}
								/>
							)}
							{otherUserData && (
								<UserBriefInformation
									nickname={otherUserData?.nickname}
									condition={otherUserData?.status}
									className={style['user-brief-information']}
									userId={otherUserData?.id}
									imgUrl={otherUserData?.profileImageURI}
								/>
							)}
						</Stack>
					</div>
				</div>
			</Stack>
		</div>
	);
};

export default PrivateParticipantList;
