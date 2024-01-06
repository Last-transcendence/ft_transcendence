import { IconButton, Input, Stack } from '@mui/material';
import { EnterKey } from '@/component/chat/icon';
import React, { ChangeEvent, useState } from 'react';
import { CommandType } from '@/component/chat/index';

interface SendChatProps {
	sendAction: (message: string) => void;
	commandAction: (type: CommandType, nickname?: string, message?: string) => void;
}

const SendChat = ({ sendAction, commandAction }: SendChatProps) => {
	const [chat, setChat] = useState('');
	const onEnter = () => {
		if (chat === '' || !chat) return;
		if (chat[0] === '/') {
			const command = chat.split(' ')?.[0]?.[1];
			const nickname = chat.split(' ')?.[1];
			const message = chat.split(' ')?.[2];

			console.log(command, nickname, message);
			switch (command) {
				case '/help':
					commandAction('HELP');
					return;
				case '/w':
					commandAction('DM', nickname, message);
					return;
				case '/i':
					commandAction('INVITE', nickname);
					return;
				case '/g':
					commandAction('GAME', nickname);
					return;
				default:
					sendAction(chat ?? '');
					return;
			}
			setChat('');
		} else {
			sendAction(chat ?? '');
			setChat('');
		}
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
