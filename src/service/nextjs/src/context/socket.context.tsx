import CustomConfirmModal from '@/component/common/CustomConfirmModal';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const connect = () => {
	alert('Connected');
};

const disconnect = () => {
	alert('Disconnected');
};

const initSocket = (namespace: string): Socket => {
	const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/socket/${namespace}`);

	socket.on('connect', () => {
		connect();
	});
	socket.on('disconnect', () => {
		disconnect();
	});
	return socket;
};

type Sockets = {
	chatSocket: Socket | null;
	channelSocket: Socket | null;
	gameSocket: Socket | null;
};

const SocketContext = createContext<{
	sockets: Sockets;
	setSocket: Dispatch<SetStateAction<Sockets>>;
}>({
	sockets: {
		chatSocket: null,
		channelSocket: null,
		gameSocket: null,
	},
	setSocket: () => {},
});

export const SocketProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [sockets, setSocket] = useState<Sockets>({
		chatSocket: null,
		channelSocket: null,
		gameSocket: null,
	});
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<{
		title: string;
		content: string;
	}>({
		title: '',
		content: '',
	});

	useEffect(() => {
		if (!sockets.chatSocket) {
			sockets.chatSocket = initSocket('chat');
			sockets.chatSocket.on('game', (res: any) => {
				setMessage({
					title: '게임 초대',
					content: `${res?.nickname}님이 1:1 게임을 초대했습니다`,
				});
				setOpen(true);
			});
			//@todo 나갈 때 이벤트 제거?
		}
		if (!sockets.channelSocket) {
			sockets.channelSocket = initSocket('/socket/channel');
		}
		if (!sockets.gameSocket) {
			sockets.gameSocket = initSocket('game');
		}
	}, [sockets]);

	return (
		<>
			{open && (
				<CustomConfirmModal
					setIsOpened={setOpen}
					onConfirm={() => {
						setOpen(false);
						//게임 승낙
						sockets.chatSocket?.emit('game');
					}}
					onCancel={() => {
						setOpen(false);
						//게임 거절
					}}
					title={message.title}
					content={message.content}
				/>
			)}
			<SocketContext.Provider value={{ sockets, setSocket }}>{children}</SocketContext.Provider>
		</>
	);
};

export default SocketContext;
