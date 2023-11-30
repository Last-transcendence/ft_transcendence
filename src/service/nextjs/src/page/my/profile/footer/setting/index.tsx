import { User } from 'context/AuthContext';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ProfileSettingStyle from './index.style';
import ProfileSettingAfterAuthorized from './after-authorized';
import ProfileSettingBeforeAuthorized from './before-authorized';
import { SettingIcon } from '../icon';

const Header = () => {
	return (
		<div>
			<SettingIcon width={35} height={35} onClick={undefined} />
			<span>설정</span>
		</div>
	);
};

const Body = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setMe, setIsModalOpened } = props;
	const [authorized, setAuthorized] = useState(false);

	if (!me) {
		return null;
	}

	return (
		<div>
			{authorized ? (
				<ProfileSettingAfterAuthorized me={me} setMe={setMe} setIsModalOpened={setIsModalOpened} />
			) : (
				<ProfileSettingBeforeAuthorized me={me} setAuthorized={setAuthorized} />
			)}
		</div>
	);
};

const MyPageProfileSetting = (props: {
	me: User;
	setMe: Dispatch<SetStateAction<User | null>>;
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setMe, setIsModalOpened } = props;

	return (
		<div className={ProfileSettingStyle}>
			<Header />
			<Body me={me} setMe={setMe} setIsModalOpened={setIsModalOpened} />
		</div>
	);
};

export default MyPageProfileSetting;
