// components/LogoutOnUnload.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { deleteFetcher } from '@/service/api';

const LogoutOnUnload = () => {
	const router = useRouter();

	useEffect(() => {
		const handleUnload = async () => {
			await deleteFetcher('/auth/logout');
			router.push('/login');
		};

		window.addEventListener('beforeunload', handleUnload);

		return () => {
			window.removeEventListener('beforeunload', handleUnload);
		};
	}, [router]);

	return null;
};

export default LogoutOnUnload;
