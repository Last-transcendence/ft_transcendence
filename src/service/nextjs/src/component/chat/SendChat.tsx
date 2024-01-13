import { IconButton, Input, Stack } from '@mui/material';
import { EnterKey } from '@/component/chat/icon';
import React, { ChangeEvent, useState } from 'react';
import { CommandType } from '@/component/chat/ChatRoomLayout';

interface SendChatProps {
	sendAction: (message: string) => void;
	commandAction: (type: CommandType, nickname?: string, message?: string) => void;
}

const SendChat = ({ sendAction, commandAction }: SendChatProps) => {
	const [chat, setChat] = useState('');
	const onEnter = () => {
		if (chat === '' || !chat) return;
		if (chat[0] === '/') {
			const chatSplit = chat.split(' ');
			const command = chatSplit?.[0];
			const nickname = chatSplit?.[1];
			const message = chatSplit?.[2];

			switch (command) {
				case '/help':
					commandAction('HELP');
					break;
				case '/w':
					commandAction('DM', nickname, message);
					break;
				case '/i':
					commandAction('INVITE', nickname);
					break;
				case '/g':
					commandAction('GAME', nickname);
					break;
				default:
					sendAction(chat ?? '');
					break;
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
		<Stack bgcolor={'gray'} width={'100%'} height={'80px'}>
			<Stack flexDirection={'row'} padding={2}>
				<Input
					fullWidth
					value={chat}
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
