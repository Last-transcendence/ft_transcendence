// components/LogoutOnUnload.tsx
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postFetcher } from '@/service/api';

const LogoutOnUnload = () => {
	const router = useRouter();
	const { pathname } = router;
	const { sockets } = useContext(SocketContext);

	useEffect(() => {
		window.onbeforeunload = () => {
			if (pathname === "/game") {

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
