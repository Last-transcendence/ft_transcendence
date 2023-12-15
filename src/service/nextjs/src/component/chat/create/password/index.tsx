'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import style from '../../../../style/chat/create/password/index.module.css';

interface CreateChatPasswordProps {
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
}

const CreateChatPassword = ({ password, setPassword }: CreateChatPasswordProps) => {
	return (
		<div className={style.container}>
			<span>비밀번호 설정</span>
			<input
				type="password"
				placeholder="비밀번호를 입력하세요."
				value={password}
				onChange={event => setPassword(event.target.value)}
			/>
		</div>
	);
};

export default CreateChatPassword;
