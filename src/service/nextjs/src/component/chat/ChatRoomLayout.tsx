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
import User from '@/type/user.type';

export type CommandType = 'DM' | 'GAME' | 'HELP';

interface ChatRoomLayoutProps {
	type: 'channel' | 'chatroom';
	children: ReactNode;
	myRole?: ParticipantRole;
	data?: any;
	ownerId?: string | undefined;
	chatLiveData: ChatLiveDataType[];
	setChatLiveData: Dispatch<SetStateAction<ChatLiveDataType[]>>;
	otherUserData?: User;
}

const ChatRoomLayout = ({
	type,
	children,
	myRole,
	data,
	ownerId,
	chatLiveData,
	setChatLiveData,
	otherUserData,
}: ChatRoomLayoutProps) => {
	const params = useParams<{ id: string }>();
	const { channelSocket, chatSocket } = useContext(SocketContext).sockets;
	const { me } = useContext(AuthContext);
	const { currentDm } = useContext(ListenContext);

	//채널 메세지 수신 (한번만 등록)
	useEffect(() => {
		if (type === 'chatroom') return;
		if (!channelSocket) return;
		console.log({ channelId: params?.id, password: '' });
		channelSocket.emit('join', { channelId: params?.id, password: null }, (res: any) => {
			console.log('join', res);
		});
		channelSocket.on('message', res => {
			console.log('channel!!!', res);
			if (params?.id === res.channelId)
				setChatLiveData((prev: ChatLiveDataType[]) => [
					...prev,
					{ type: 'chat', id: res?.userId, message: res?.message },
				]);
		});
		return () => {
			channelSocket?.off('message');
		};
	}, [channelSocket]);

	//DM 메세지 수신
	useEffect(() => {
		if (type === 'channel') return;
		if (!currentDm?.message || currentDm?.message === '') return;
		setChatLiveData((prev: ChatLiveDataType[]) => [
			...prev,
			{ type: 'chat', id: currentDm?.srcId, message: currentDm?.message },
		]);
	}, [currentDm]);

	const sendAction = useCallback(
		(message: string) => {
			if (message === '' || !params?.id || !me?.id) return;
			const req =
				type === 'channel'
					? {
							channelId: params?.id,
							userId: me?.id,
							message: message,
						}
					: { destId: params?.id, message };

			console.log('req', req);
			// send message
			(type === 'channel' ? channelSocket : chatSocket)?.emit('message', req, (res: any) => {
				//성공 시 세팅
				if (res?.res) {
					setChatLiveData((prev: ChatLiveDataType[]) => [
						...prev,
						{ type: 'chat', id: me?.id, message: message, me: true },
					]);
				}
			});
		},
		[me?.id, params?.id, setChatLiveData, type],
	);

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
				// @todo 게임 시작
				channelSocket?.emit(
					'invite',
					{
						channelId,
						userId: me?.id,
						nickname,
					},
					(response: any) => {
						console.log(response);
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
			if (me?.id === id) return me;
			if (type === 'channel') return data?.participant?.find((user: any) => user?.userId === id);
			return otherUserData;
		},
		[data?.participant, me, otherUserData, type],
	);

	return (
		<Stack width={'100%'} height={'100%'}>
			{/*헤더 영역*/}
			<div>{children}</div>
			<Stack padding={2} spacing={1} sx={{ overflowY: 'scroll' }} height={'100%'}>
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
			{/*@todo 연결이 완료되어야 채팅을 보낼 수 있도록 설정 */}
			<SendChat sendAction={sendAction} commandAction={commandAction} />
		</Stack>
	);
};

export default ChatRoomLayout;
