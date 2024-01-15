import { useParams } from 'next/navigation';
import { ReactNode, useCallback, useContext, useState } from 'react';
import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import { ParticipantRole } from '@/type/channel.type';
import SendChat from '@/component/chat/SendChat';
import SocketContext from '@/context/socket.context';
import AuthContext from '@/context/auth.context';
import useListeningChannelEvent from '@/hook/useListeningChannelEvent';

export type CommandType = 'DM' | 'INVITE' | 'GAME' | 'HELP';

interface ChatRoomLayoutProps {
	type: 'chat' | 'dm';
	children: ReactNode;
	myRole?: ParticipantRole;
	data?: any;
	ownerId?: string | undefined;
}

const ChatRoomLayout = ({ type, children, myRole, data, ownerId }: ChatRoomLayoutProps) => {
	const params = useParams<{ id: string }>();
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	// 실시간으로 보여질 채팅 데이터
	const [chatLiveData, setChatLiveData] = useState<any[]>([]);
	const { me } = useContext(AuthContext);

	//메세지 수신
	useListeningChannelEvent('message', (res: any) => {
		setChatLiveData(prev => [...prev, { type: 'chat', id: res?.userId, message: res?.message }]);
	});

	const sendAction = (message: string) => {
		if (message === '') return;
		// send message
		channelSocket?.emit(
			'message',
			{ channelId: params?.id, userId: me?.id, message },
			(res: any) => {
				console.log(res);
				//성공 시 세팅
				setChatLiveData(prev => [...prev, { type: 'chat', id: me?.id, message: message }]);
			},
		);
	};

	const commandAction = (type: CommandType, nickname?: string, message?: string) => {
		switch (type) {
			case 'HELP':
				alert('HELP');
				setChatLiveData(prev => [...prev, { type: 'help' }]);
				break;
			case 'DM':
				alert('DM');
				// send DM invite (nickname, message)
				break;
			case 'GAME':
				alert('GAME');
				// game invite
				break;
			default:
				break;
		}
	};

	const getUser = useCallback(
		(id: string) => {
			return data?.participant?.find((user: any) => user?.id === id);
		},
		[data?.participant],
	);

	return (
		<Stack width={'100%'} height={'100%'}>
			{/*헤더 영역*/}
			<div>{children}</div>
			{/*채팅 영역*/}
			<Stack padding={2} spacing={2} sx={{ overflowY: 'scroll' }} height={'100%'}>
				{chatLiveData?.map((chat: any, index: number) => {
					if (chat.type === 'chat') {
						const userData = getUser(chat?.id);
						return (
							<ChatMsg
								userId={userData?.id}
								nickname={userData?.nickname}
								key={index}
								myRole={myRole}
								channelId={params?.id}
								ownerId={ownerId}
								message={chat?.message}
							/>
						);
					} else if (chat.type === 'help') return <HelpMsg />;
					else if (chat.type === 'action') return <StatusMsg content={chat?.content} />;
				})}
			</Stack>
			<SendChat sendAction={sendAction} commandAction={commandAction} />
		</Stack>
	);
};

export default ChatRoomLayout;
