import axios from 'axios';
import { User } from 'context/AuthContext';
import { Member } from 'context/MemberContext';
import React, { Dispatch, SetStateAction, useState } from 'react';
import MyPageProfileFooterStyle from './index.style';
import { SettingIcon } from './icon';
import { Modal } from 'component/modal';
import MyPageProfileSetting from './setting';

const MyPageProfileFooter = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	members: Member[];
	setMembers: Dispatch<SetStateAction<Member[] | null>>;
}) => {
	const { me, setMe } = props;
	const [isModalOpened, setIsModalOpened] = useState(false);
	const changePassword = async () => {
		axios
			.patch(`${process.env.REACT_APP_NESTJS_URL}/user/me`, { withCredentials: true })
			.then(response => {
				setMe(response.data);
			})
			.catch(error => {
				console.error(error);
				alert(error.response.data.message);
			});
	};

	return (
		<div className={MyPageProfileFooterStyle}>
			<SettingIcon
				width={28}
				height={28}
				onClick={() => {
					setIsModalOpened(true);
				}}
			/>
			{isModalOpened ? (
				<Modal setIsModalOpened={setIsModalOpened}>
					<MyPageProfileSetting me={me} setMe={setMe} setIsModalOpened={setIsModalOpened} />
				</Modal>
			) : null}
		</div>
	);
	changePassword();
};

export default MyPageProfileFooter;
