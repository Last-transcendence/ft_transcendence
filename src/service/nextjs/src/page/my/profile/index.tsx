import React, { Dispatch, SetStateAction, useContext } from 'react';
import { User } from 'context/AuthContext';
import { ClubContext } from 'context/ClubContext';
import { Member } from 'context/MemberContext';
import MyPageProfileStyle from './index.style';
import MyPageProfileHeader from './header';
import MyPageProfileBody from './body';
import MyPageProfileFooter from './footer';

const MyPageProfile = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	members: Member[];
	setMembers: Dispatch<SetStateAction<Member[] | null>>;
}) => {
	const { me, setMe, members, setMembers } = props;
	const { club } = useContext(ClubContext);
	if (!club) {
		return null;
	}

	return (
		<>
			<div className={MyPageProfileStyle}>
				<MyPageProfileHeader
					me={me}
					setMe={setMe}
					members={members}
					setMembers={setMembers}
					club={club}
				/>
				<div>
					<MyPageProfileBody me={me} members={members} club={club} />
					<MyPageProfileFooter me={me} setMe={setMe} members={members} setMembers={setMembers} />
				</div>
			</div>
		</>
	);
};

export default MyPageProfile;
