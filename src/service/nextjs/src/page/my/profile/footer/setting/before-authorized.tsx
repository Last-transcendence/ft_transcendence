import axios from 'axios';
import { User } from 'context/AuthContext';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ProfileSettingBeforeAuthorizedStyle } from './before-authorized.style';

const ProfileSettingBeforeAuthorized = (props: {
	me: User;
	setAuthorized: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, setAuthorized } = props;
	const [password, setPassword] = useState<string | undefined>(undefined);
	const handleSubmit = (
		event: React.FormEvent<HTMLFormElement>,
		id: string,
		password: string | undefined,
		setPassword: Dispatch<SetStateAction<string | undefined>>,
	) => {
		event.preventDefault();
		axios
			.patch(
				`${process.env.REACT_APP_NESTJS_URL}/auth/login`,
				{ id, password },
				{ withCredentials: true },
			)
			.then(response => {
				if (response.status === 200) {
					setAuthorized(true);
				}
			})
			.catch(error => {
				console.error(error);
				alert('비밀번호가 일치하지 않습니다.');
				setPassword('');
			});
	};

	return (
		<div className={ProfileSettingBeforeAuthorizedStyle}>
			<span>비밀번호 확인</span>
			<span>본인 확인을 위해 비밀번호를 입력해주세요.</span>
			<form onSubmit={event => handleSubmit(event, me.id, password, setPassword)}>
				<input
					type="password"
					placeholder="비밀번호"
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>
				<button type="submit">확인</button>
			</form>
		</div>
	);
};

export default ProfileSettingBeforeAuthorized;
