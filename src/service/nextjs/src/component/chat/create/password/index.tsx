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
				type="text"
				placeholder="비밀번호를 입력하세요. (6자리 숫자)"
				value={password}
				onChange={event => {
					if (event.target.value.length === 6) return;
					setPassword(event.target.value.replace(/[^0-9]/g, ''));
				}}
			/>
		</div>
	);
};

export default CreateChatPassword;
