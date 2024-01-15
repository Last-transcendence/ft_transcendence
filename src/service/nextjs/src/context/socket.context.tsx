import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const initSocket = (namespace: string) => {
	const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/socket/${namespace}`);

	socket.on('connect', () => {
		alert('Connected');
	});
	socket.on('disconnect', () => {
		alert('Disconnected');
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

	useEffect(() => {
		const connect = () => {
			alert('Connected');
		};

		const disconnect = () => {
			alert('Disconnected');
		};

		if (!sockets.chatSocket) {
			sockets.chatSocket = initSocket('chat');
			return () => {
				sockets.chatSocket?.disconnect();
			};
		}
		if (!sockets.channelSocket) {
			sockets.channelSocket = initSocket('channel');
			return () => {
				sockets.channelSocket?.disconnect();
			};
		}
		if (!sockets.gameSocket) {
			sockets.gameSocket = initSocket('game');
			return () => {
				sockets.gameSocket?.disconnect();
			};
		}
	}, [sockets]);

	return <SocketContext.Provider value={{ sockets, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
