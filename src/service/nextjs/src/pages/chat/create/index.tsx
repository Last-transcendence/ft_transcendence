'use client';

import style from '../../../style/chat/create/index.module.css';
import CreateChatVisibility from '@/component/chat/create/visibility';
import CreateChatTitle from '@/component/chat/create/title';
import CreateChatPassword from '@/component/chat/create/password';
import { useState } from 'react';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { Stack } from '@mui/material';
import { ChannelVisibility } from '@/type/channel.type';
import axios from 'axios';
import CustomSnackbar from '@/component/profile/modifyProfile/customSnackbar';
import { postFetcher } from '../../../../service/api';

const ChatCreatePage = () => {
	const [visibility, setVisibility] = useState<ChannelVisibility>(ChannelVisibility.PUBLIC);
	const [title, setTitle] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [message, setMessage] = useState({
		title: '',
		success: true,
	});

	const handleSubmit = async () => {
		try {
			await postFetcher('/channel', {
				visibility,
				title,
				password,
			});
			setMessage({
				title: '생성 성공',
				success: true,
			});
		} catch (e) {
			setMessage({
				title: '생성 실패',
				success: false,
			});
			console.error(e);
		} finally {
			setShowSnackbar(true);
		}
	};

	return (
		<div>
			<CustomSnackbar
				open={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				message={message.title}
				success={message.success}
				position={'top'}
				horizontal={'center'}
			/>
			<div className={style.container}>
				<Header title={'채널 생성'} />
				<Stack gap={4}>
					<CreateChatVisibility visibility={visibility} setVisibility={setVisibility} />
					<CreateChatTitle title={title} setTitle={setTitle} />
					<CreateChatPassword password={password} setPassword={setPassword} />
				</Stack>
				<BottomButton title={'생성하기'} onClick={handleSubmit} />
			</div>
		</div>
	);
};

export default ChatCreatePage;
