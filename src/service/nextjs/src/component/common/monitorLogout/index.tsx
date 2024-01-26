// components/LogoutOnUnload.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { postFetcher } from '@/service/api';

const LogoutOnUnload = () => {
	const router = useRouter();

	useEffect(() => {
		window.onbeforeunload = () => {
			postFetcher('/user/offline').catch(async (error: any) => {});
		};
		return () => {
			window.onbeforeunload = () => {};
		};
	}, [router]);

	return null;
};

export default LogoutOnUnload;
