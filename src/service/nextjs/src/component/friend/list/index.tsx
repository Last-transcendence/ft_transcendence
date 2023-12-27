import UserBriefInformation from '@/component/common/user/bried-information';
import style from '../../../style/friend/list/index.module.css';
import FriendStatus from './status';

const Title = () => {
	return (
		<div>
			<span>친구 목록</span>
		</div>
	);
};

const FriendList = () => {
	return (
		<div className={style.container}>
			<Title />
			<div>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구1"
					condition={<FriendStatus status="게임 중" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구2"
					condition={<FriendStatus status="온라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구3"
					condition={<FriendStatus status="오프라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구3"
					condition={<FriendStatus status="오프라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구3"
					condition={<FriendStatus status="오프라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구3"
					condition={<FriendStatus status="오프라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구3"
					condition={<FriendStatus status="오프라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
					profileImageSrc={null}
					nickName="친구3"
					condition={<FriendStatus status="오프라인" />}
					className={style['user-brief-information']}
				/>
				<UserBriefInformation
				profileImageSrc={null}
				nickName="친구3"
				condition={<FriendStatus status="오프라인" />}
				className={style['user-brief-information']}
				/>
			</div>
		</div>
	);
};

export default FriendList;
