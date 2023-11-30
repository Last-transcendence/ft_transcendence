import { Member } from 'context/MemberContext';
import React, { Dispatch, SetStateAction } from 'react';
import InfoPageMemberBodyStyle from './index.style';
import MemberProfile from '../profile';

const InfoPageMemberBody = (props: {
	members: Member[] | null;
	setMembers: Dispatch<SetStateAction<Member[] | null>>;
}) => {
	const { members, setMembers } = props;
	const managers = members?.filter(member => member.role === 'manager');

	return (
		<div className={InfoPageMemberBodyStyle}>
			<div>
				<div>
					<span>{'< 임원 >'}</span>
					<span>총 {managers?.length || 0}명</span>
				</div>
				<div>
					{members?.map((member, index) => {
						if (member.role === 'manager') {
							return <MemberProfile key={index} member={member} />;
						}
					})}
				</div>
			</div>
			<div>
				<div>
					<span>{'< 부원 >'}</span>
					<span>총 {(members?.length || 0) - (managers?.length || 0)}명</span>
				</div>
				<div>
					{members?.map((member, index) => {
						if (member.role === 'member') {
							return <MemberProfile key={index} member={member} />;
						}
					})}
				</div>
			</div>
		</div>
	);
	setMembers(null);
};

export default InfoPageMemberBody;
