import AuthContext from '@/context/auth.context';
import { getFetcher } from '@/service/api';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import Me from '@/type/me.type';

const LoginCallBackPage = () => {
	const { setMe } = useContext(AuthContext);
	const navigate = useRouter();

	useEffect(() => {
		getFetcher<Me | null>('/user/me')
			.then(response => {
				setMe(response);
				navigate.push('/');
			})
			.catch(err => {
				//console.error(err);
				navigate.push('/auth/register');
			});
	}, [setMe, navigate]);

	return <></>;
};

export default LoginCallBackPage;
