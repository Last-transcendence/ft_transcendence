import AuthContext from '@/context/auth.context';
import SocketContext from '@/context/socket.context';
import { postFetcher } from '@/service/api';
import { UserStatus } from '@/type';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const LogoutOnUnload = () => {
	const router = useRouter();
	const { pathname } = router;
	const { sockets } = useContext(SocketContext);

	useEffect(() => {
		window.onbeforeunload = () => {
			if (sockets.gameSocket && pathname.indexOf('/game') === -1) {
				sockets.gameSocket?.emit('leave', { pathname });
			}
			postFetcher('/user/offline').catch(async (error: any) => {});
		};
		router.events.on('routeChangeStart', () => {
			if (sockets.gameSocket && pathname.indexOf('/game') === -1) {
				sockets.gameSocket?.emit('leave', { pathname });
			}
		});
		return () => {
			window.onbeforeunload = () => {};
			router.events.off('routeChangeStart', () => {});
		};
	}, [sockets, router, pathname]);

	return null;
};

export default LogoutOnUnload;
