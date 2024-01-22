import { useParams } from 'next/navigation';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from 'react';
import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import { ParticipantRole } from '@/type/channel.type';
import SendChat from '@/component/chat/SendChat';
import SocketContext from '@/context/socket.context';
import AuthContext from '@/context/auth.context';
import { ChatLiveDataType } from '@/component/chat/CommonChatRoomPage';
import ListenContext from '@/context/listen.context';

export type CommandType = 'DM' | 'GAME' | 'HELP';

interface ChatRoomLayoutProps {
	type: 'channel' | 'chatroom';
	children: ReactNode;
	myRole?: ParticipantRole;
	data?: any;
	ownerId?: string | undefined;
	chatLiveData: ChatLiveDataType[];
	setChatLiveData: Dispatch<SetStateAction<ChatLiveDataType[]>>;
}

const ChatRoomLayout = ({
	type,
	children,
	myRole,
	data,
	ownerId,
	chatLiveData,
	setChatLiveData,
}: ChatRoomLayoutProps) => {
	const params = useParams<{ id: string }>();
	const { channelSocket, chatSocket } = useContext(SocketContext).sockets;
	const { me } = useContext(AuthContext);
	const { currentDm } = useContext(ListenContext);
	const socket = useMemo(() => {
		if (type === 'channel') return channelSocket;
		else return chatSocket;
	}, [channelSocket, chatSocket, type]);

	//채널 메세지 수신 (한번만 등록)
	useEffect(() => {
		if (type === 'chatroom') return;
		channelSocket?.on('message', res => {
			if (params?.id === res.channelId)
				setChatLiveData((prev: ChatLiveDataType[]) => [
					...prev,
					{ type: 'chat', id: res?.userId, message: res?.message },
				]);
		});
		return () => {
			channelSocket?.off('message');
		};
	}, []);

	//DM 메세지 세팅
	useEffect(() => {
		if (type === 'channel') return;
		if (!currentDm?.message || currentDm?.message === '') return;
		setChatLiveData((prev: ChatLiveDataType[]) => [
			...prev,
			{ type: 'chat', id: currentDm?.userId, message: currentDm?.message },
		]);
	}, [currentDm]);

	const sendAction = (message: string) => {
		if (message === '' || !params?.id || !me?.id) return;
		// send message
		socket?.emit('message', { channelId: params?.id, userId: me?.id, message }, (res: any) => {
			console.log(res);
			console.log('message', message);
			//성공 시 세팅
			if (res?.res) {
				setChatLiveData((prev: ChatLiveDataType[]) => [
					...prev,
					{ type: 'chat', id: me?.id, message: message, me: true },
				]);
			}
		});
	};

	const commandAction = (
		type: CommandType,
		nickname?: string,
		message?: string,
		channelId?: string,
	) => {
		switch (type) {
			case 'HELP':
				setChatLiveData((prev: ChatLiveDataType[]) => [...prev, { type: 'help' }]);
				break;
			case 'DM':
				if (!nickname) return;

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
			<Stack padding={2} spacing={1} sx={{ overflowY: 'scroll' }} height={'100%'}>
				{chatLiveData?.map((chat: any, index: number) => {
					if (chat.type === 'chat') {
						const userData = chat?.me ? me : getUser(chat?.id);
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
			{/*@todo 연결이 완료되어야 채팅을 보낼 수 있도록 설정 */}
			<SendChat sendAction={sendAction} commandAction={commandAction} />
		</Stack>
	);
};

export default ChatRoomLayout;
