import { useParams } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, useCallback, useContext } from 'react';
import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import { ParticipantRole } from '@/type/channel.type';
import SendChat from '@/component/chat/SendChat';
import SocketContext from '@/context/socket.context';
import AuthContext from '@/context/auth.context';
import useListeningChannelEvent from '@/hook/useListeningChannelEvent';
import { ChatLiveDataType } from '@/component/chat/index';

export type CommandType = 'DM' | 'GAME' | 'HELP';

interface ChatRoomLayoutProps {
	children: ReactNode;
	myRole?: ParticipantRole;
	data?: any;
	ownerId?: string | undefined;
	chatLiveData: ChatLiveDataType[];
	setChatLiveData: Dispatch<SetStateAction<ChatLiveDataType[]>>;
}

const ChatRoomLayout = ({
	children,
	myRole,
	data,
	ownerId,
	chatLiveData,
	setChatLiveData,
}: ChatRoomLayoutProps) => {
	const params = useParams<{ id: string }>();
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const { me } = useContext(AuthContext);

	//메세지 수신
	useListeningChannelEvent('message', (res: any) => {
		setChatLiveData((prev: ChatLiveDataType[]) => [
			...prev,
			{ type: 'chat', id: res?.userId, message: res?.message },
		]);
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
				setChatLiveData((prev: ChatLiveDataType[]) => [
					...prev,
					{ type: 'chat', id: me?.id, message: message },
				]);
			},
		);
	};

	const commandAction = (
		type: CommandType,
		nickname?: string,
		message?: string,
		channelId?: string,
	) => {
		switch (type) {
			case 'HELP':
				alert('HELP');
				setChatLiveData((prev: ChatLiveDataType[]) => [...prev, { type: 'help' }]);
				break;
			case 'DM':
				alert('DM');
				// send DM invite (nickname, message)
				break;
			case 'GAME':
				if (!nickname) return;
				// @todo 게임 시작
				channelSocket?.emit(
					'game',
					{
						channelId,
						userId: me?.id,
						toNickname: nickname,
					},
					(res: any) => {
						console.log(res);
						//성공 시 세팅
						alert('GAME START');
					},
				);
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
								userData={userData}
								key={index}
								myRole={myRole}
								channelId={params?.id}
								ownerId={ownerId}
								message={chat?.message}
							/>
						);
					} else if (chat.type === 'help') return <HelpMsg />;
					else if (chat.type === 'action') return <StatusMsg message={chat?.message} />;
				})}
			</Stack>
			<SendChat sendAction={sendAction} commandAction={commandAction} />
		</Stack>
	);
};

export default ChatRoomLayout;
