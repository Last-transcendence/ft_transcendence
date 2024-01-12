import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<{
	socket: Socket | null;
	setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}>({
	socket: null,
	setSocket: () => {},
});

export const SocketProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const connect = () => {
			alert('Connected');
		};

		const disconnect = () => {
			alert('Disconnected');
		};

		if (!socket) {
			const newSocket = io('http://localhost:4000');
			setSocket(newSocket);

			newSocket.on('connect', connect);
			newSocket.on('disconnect', disconnect);

			return () => {
				newSocket.off('connect', connect);
				newSocket.off('disconnect', disconnect);
			};
		} else {
			socket.on('connect', connect);
			socket.on('disconnect', disconnect);

			return () => {
				socket.off('connect', connect);
				socket.off('disconnect', disconnect);
			};
		}
	}, [socket]);

	return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};
