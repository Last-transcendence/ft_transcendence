import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const connect = () => {
	alert('Connected');
};

const disconnect = () => {
	alert('Disconnected');
};

const initSocket = (namespace: string) => {
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

	useEffect(() => {
		if (!sockets.chatSocket) {
			sockets.chatSocket = initSocket('chat');
		}
		if (!sockets.channelSocket) {
			sockets.channelSocket = initSocket('channel');
		}
		if (!sockets.gameSocket) {
			sockets.gameSocket = initSocket('game');
		}
	}, [sockets]);

	return <SocketContext.Provider value={{ sockets, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
