import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from 'context/AuthContext';
import { ProfileSettingAfterAuthorizedStyle } from './index.style';
import ProfileSettingEdit from './edit';

const ProfileSettingAfterAuthorized = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setMe, setIsModalOpened } = props;
	const [isClicked, setIsClicked] = useState<boolean>(false);

	return (
		<>
			{isClicked ? (
				<ProfileSettingEdit me={me} setMe={setMe} setIsModalOpened={setIsModalOpened} />
			) : (
				<div className={ProfileSettingAfterAuthorizedStyle}>
					<div>
						<span>아이디</span>
						<span>{me.id}</span>
					</div>
					<div>
						<span>비밀번호</span>
						<button
							onClick={() => {
								setIsClicked(true);
							}}
						>
							수정하기
						</button>
					</div>
				</div>
			)}
		</>
	);
	console.log(me, setMe, setIsModalOpened);
};

export default ProfileSettingAfterAuthorized;
