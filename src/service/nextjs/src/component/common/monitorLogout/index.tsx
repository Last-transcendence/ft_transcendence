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
		if (sockets.gameSocket) {
			window.onbeforeunload = () => {
				if (pathname.indexOf('/game') === -1) {
					sockets.gameSocket?.emit('leave', { pathname });
				}
				postFetcher('/user/offline').catch(async (error: any) => {});
			};
			router.events.on('routeChangeStart', () => {
				if (pathname.indexOf('/game') === -1) {
					sockets.gameSocket?.emit('leave', { pathname });
				}
			});
		}
		return () => {
			window.onbeforeunload = () => {};
			router.events.off('routeChangeStart', () => {});
		};
	}, [sockets.gameSocket]);

	return null;
};

export default LogoutOnUnload;
