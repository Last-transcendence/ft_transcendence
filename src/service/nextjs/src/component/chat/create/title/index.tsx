'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import style from '../../../../style/chat/create/title/index.module.css';

interface CreateChatTitleProps {
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
}

const CreateChatTitle = ({ title, setTitle }: CreateChatTitleProps) => {
	return (
		<div className={style.container}>
			<span>채널명</span>
			<input
				type="text"
				value={title}
				placeholder="채널명을 입력하세요."
				onChange={event => {
					if (event.target.value.length === 10) return;
					setTitle(event.target.value);
				}}
			/>
		</div>
	);
};

export default CreateChatTitle;
