import CustomConfirmModal from '@/component/common/CustomConfirmModal';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const connect = (namespace: string) => {
	//alert(`Socket connected on ${namespace}`);
};

const disconnect = (namespace: string) => {
	//alert(`Socket disconnected on ${namespace}`);
};

const initSocket = (namespace: string): Socket => {
	const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/socket/${namespace}`, {
		transports: ['websocket'],
		withCredentials: true,
	});

	socket.on('connect', () => {
		connect(namespace);
	});
	socket.on('disconnect', () => {
		disconnect(namespace);
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
			setSocket({
				...sockets,
				chatSocket: initSocket('chat'),
			});
			sockets?.chatSocket &&
				(sockets.chatSocket as any).on('game', (res: any) => {
					setMessage({
						title: '게임 초대',
						content: `${res?.nickname}님이 1:1 게임을 초대했습니다`,
					});
					setOpen(true);
				});
		}
		if (!sockets.channelSocket) {
			setSocket({
				...sockets,
				channelSocket: initSocket('channel'),
			});
		}
		if (!sockets.gameSocket) {
			setSocket({
				...sockets,
				gameSocket: initSocket('game'),
			});
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
