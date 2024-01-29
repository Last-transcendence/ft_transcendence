// components/LogoutOnUnload.tsx
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postFetcher } from '@/service/api';
import SocketContext from '@/context/socket.context';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

const LogoutOnUnload = () => {
	const router = useRouter();
	const { pathname } = router;
	const { sockets } = useContext(SocketContext);

	useEffect(() => {
		window.onbeforeunload = () => {
			if (pathname.indexOf('/game') === 0) {
				console.log(pathname);
				sockets.gameSocket?.emit('leave');
			}
			postFetcher('/user/offline').catch(async (error: any) => {});
		};
		return () => {
			window.onbeforeunload = () => {};
		};
	}, [router]);

	return null;
};

export default LogoutOnUnload;
