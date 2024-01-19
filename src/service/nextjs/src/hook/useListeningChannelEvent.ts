import { useContext, useEffect } from 'react';
import SocketContext from '@/context/socket.context';

const useListeningChannelEvent = (event: string, onListen: (res: any) => void) => {
	const { sockets } = useContext(SocketContext);
	const channelSocket = sockets?.channelSocket;

	useEffect(() => {
		channelSocket?.on(event, res => onListen(res));
		return () => {
			channelSocket?.off(event);
		};
	}, []);
};

export default useListeningChannelEvent;
