import { IconButton, Input, Stack } from '@mui/material';
import { EnterKey } from '@/component/chat/icon';
import React, { ChangeEvent, useState } from 'react';

const SendChat = () => {
	const [chat, setChat] = useState('');
	const onEnter = () => {
		alert(chat);
	};
	const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setChat(e.target.value);
	};

	return (
		<Stack bgcolor={'gray'} width={'100%'} position={'fixed'} bottom={0}>
			<Stack flexDirection={'row'} padding={2}>
				<Input
					fullWidth
					onChange={onChangeInput}
					sx={{ backgroundColor: 'white' }}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							onEnter();
						}
					}}
				/>
				<IconButton onClick={() => onEnter()}>
					<EnterKey width={32} height={32} />
				</IconButton>
			</Stack>
		</Stack>
	);
};

export default SendChat;
