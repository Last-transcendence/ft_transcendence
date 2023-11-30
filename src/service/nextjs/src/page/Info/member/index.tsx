import React, { useContext, useState } from 'react';
import InfoPageMemberStyle from './index.style';
import { MemberContext } from 'context/MemberContext';
import InfoPageMemberHeader from './header';
import InfoPageMemberBody from './body';

const InfoPageMember = () => {
	const { members, setMembers } = useContext(MemberContext);
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div className={InfoPageMemberStyle}>
			<div>
				<InfoPageMemberHeader isOpened={isOpened} setIsOpened={setIsOpened} />
				{isOpened && <InfoPageMemberBody members={members} setMembers={setMembers} />}
			</div>
		</div>
	);
};

export default InfoPageMember;
