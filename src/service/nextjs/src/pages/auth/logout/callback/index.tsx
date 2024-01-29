import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/auth.context';

const LogoutCallbackPage = () => {
	const router = useRouter();
	const { me, setMe } = useContext(AuthContext);

	useEffect(() => {
		setMe(null);
		if (!me) {
			console.log("LogoutCallbackPage", me);
			router.push('/auth/login');
		}
	}, [me]);

	return null;
};

export default LogoutCallbackPage;