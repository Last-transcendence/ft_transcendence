import { User } from 'context/AuthContext';
import { Club } from 'context/ClubContext';
import { Member } from 'context/MemberContext';
import React, { Dispatch, SetStateAction, useState } from 'react';
import MyProfileEditModal from './edit';
import { EditIcon, HumanIcon } from './icon';
import MyPageProfileHeaderStyle from './index.style';
import { Modal } from 'component/modal';

const MyPageProfileHeader = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	members: Member[];
	setMembers: Dispatch<SetStateAction<Member[] | null>>;
	club: Club;
}) => {
	const { me, setMe, members, setMembers, club } = props;
	const [isModalOpened, setIsModalOpened] = useState(false);

	return (
		<div className={MyPageProfileHeaderStyle}>
			<div>
				<HumanIcon width={28} height={28} />
				<span>내 정보</span>
			</div>
			<div
				onClick={() => {
					setIsModalOpened(true);
				}}
			>
				<EditIcon width={18} height={18} />
				<span>수정</span>
			</div>
			{isModalOpened ? (
				<Modal setIsModalOpened={setIsModalOpened}>
					<MyProfileEditModal
						me={me}
						setMe={setMe}
						members={members}
						setMembers={setMembers}
						club={club}
						setIsModalOpened={setIsModalOpened}
					/>
				</Modal>
			) : null}
		</div>
	);
};

export default MyPageProfileHeader;
