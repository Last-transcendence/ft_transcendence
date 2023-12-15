'use client';

import style from '../../../style/chat/create/index.module.css';
import CreateChatVisibility from '@/component/chat/create/visibility';
import CreateChatTitle from '@/component/chat/create/title';
import CreateChatPassword from '@/component/chat/create/password';
import CreateChatSubmit from '@/component/chat/create/submit';
import { useState } from 'react';

export type Visibility = 'public' | 'protected' | 'private';

const ChatCreatePage = () => {
	const [visibility, setVisibility] = useState<Visibility>('public');
	const [title, setTitle] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<div className={style.container}>
			<div>
				<CreateChatVisibility visibility={visibility} setVisibility={setVisibility} />
				<CreateChatTitle title={title} setTitle={setTitle} />
				<CreateChatPassword password={password} setPassword={setPassword} />
			</div>
			<CreateChatSubmit visibility={visibility} title={title} password={password} />
		</div>
	);
};

export default ChatCreatePage;
