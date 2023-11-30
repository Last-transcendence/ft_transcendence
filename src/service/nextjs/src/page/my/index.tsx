import React, { useContext } from 'react';
import MyPageProfile from './profile';
import { AuthContext } from 'context/AuthContext';
import { MyPageStyle } from './index.style';
import MyPageParticipate from './participate';
import { MemberContext } from 'context/MemberContext';

const MyPage = () => {
	const { me, setMe } = useContext(AuthContext);
	const { members, setMembers } = useContext(MemberContext);

	if (!me || !members) {
		return null;
	}
	return (
		<div className={MyPageStyle}>
			<MyPageProfile me={me} setMe={setMe} members={members} setMembers={setMembers} />
			<MyPageParticipate me={me} />
		</div>
	);
};

export default MyPage;
