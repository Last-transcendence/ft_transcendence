import AuthContext from '@/context/auth.context';
import { axiosInstance } from '@/service/api';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const LoginCallBackPage = () => {
	const { setMe } = useContext(AuthContext);
	const navigate = useRouter();

	useEffect(() => {
		axiosInstance
			.get('/user/me')
			.then(response => {
				setMe(response.data);
				navigate.push('/');
			})
			.catch(err => {
				console.error(err);
				navigate.push('/auth/register');
			});
	}, [setMe, navigate]);

	return <></>;
};

export default LoginCallBackPage;
