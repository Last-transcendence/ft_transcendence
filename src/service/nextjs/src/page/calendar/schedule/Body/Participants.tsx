import React, { useContext, useEffect } from 'react';
import {
	ParticipantsContainerStyle,
	SelectAllContainerStyle,
	SelectButtonStyle,
	SelectContainerStyle,
	SelectMemberManagerContainerStyle,
} from './Participants.style';
import { TitleContainer } from './TitleContainer';
import { ParticipantsIcon } from './icon';
import { Member, MemberContext } from 'context/MemberContext';
import { User } from 'context/AuthContext';
import axios from 'axios';
import { Types } from 'mongoose';

const SelectParticipants = (props: {
	member: Member;
	isSelected: boolean;
	toggleSelect: (id: Types.ObjectId) => void;
}) => {
	const { member, isSelected, toggleSelect } = props;
	const [userInfo, setUserInfo] = React.useState<User | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_NESTJS_URL}/user/${member.userId}`, {
				withCredentials: true,
			})
			.then(response => {
				setUserInfo({
					_id: response.data._id,
					name: response.data.name,
					id: response.data.id,
					password: response.data.password,
					email: response.data.email,
					major: response.data.major,
					studentId: response.data.studentId,
					phoneNumber: response.data.phoneNumber,
					sns: response.data.sns,
					profileImageId: response.data.profileImageId,
					clubs: response.data.clubs,
				});
			});
	}, []);
	return (
		<button
			className={`${SelectButtonStyle} ${isSelected ? 'selected' : ''}`}
			onClick={() => toggleSelect(member.userId)}
		>
			{userInfo?.name}
		</button>
	);
};

// Participants 컴포넌트

const Participants = (props: {
	setAttendances: React.Dispatch<React.SetStateAction<Types.ObjectId[]>>;
}) => {
	const { setAttendances } = props;
	const { members, setMembers } = useContext(MemberContext);
	console.log(setMembers);
	const [selectedMembers, setSelectedMembers] = React.useState<Types.ObjectId[]>([]);

	const toggleSelect = (id: Types.ObjectId) => {
		if (selectedMembers.includes(id)) {
			console.log('includes');
			setSelectedMembers(prev => prev.filter(memberId => String(memberId) !== String(id)));
			setAttendances(prev => prev.filter(memberId => String(memberId) !== String(id)));
		} else {
			setSelectedMembers(prev => [...prev, id]);
			setAttendances(prev => [...prev, id]);
		}
	};

	const selectAll = () => {
		if (members) {
			const allMembersIds = members.map(member => member.userId);
			setSelectedMembers(allMembersIds);
			setAttendances(allMembersIds);
		}
	};

	return (
		<div className={ParticipantsContainerStyle}>
			<TitleContainer
				titleIcon={<ParticipantsIcon width={27} height={27} />}
				title="참여자"
				subtitle="부원을 선택해주세요"
			/>
			<div className={SelectContainerStyle}>
				<div>
					<div>
						<span>{'모두 선택'}</span>
					</div>
					<div className={SelectAllContainerStyle}>
						<button className={SelectButtonStyle} onClick={selectAll}>
							{'All'}
						</button>
					</div>
				</div>
				<div>
					<div>
						<span>{'운영진'}</span>
					</div>
					<div className={SelectMemberManagerContainerStyle}>
						{members?.map((member, index) => {
							if (member.role === 'manager') {
								return (
									<SelectParticipants
										key={index}
										member={member}
										isSelected={selectedMembers.includes(member.userId)}
										toggleSelect={toggleSelect}
									/>
								);
							}
						})}
					</div>
				</div>
				<div>
					<div>
						<span>{'부원'}</span>
					</div>
					<div className={SelectMemberManagerContainerStyle}>
						{members?.map((member, index) => {
							if (member.role === 'member') {
								return (
									<SelectParticipants
										key={index}
										member={member}
										isSelected={selectedMembers.includes(member.userId)}
										toggleSelect={toggleSelect}
									/>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Participants;
