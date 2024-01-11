import AuthContext from '@/context/auth.context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const LoginCallBackPage = () => {
	const { setMe } = useContext(AuthContext);
	const navigate = useRouter();

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, { withCredentials: true })
			.then(response => {
				setMe(response.data);
				navigate.push('/');
			})
			.catch(err => {
				console.log(err);
			});
	}, [setMe, navigate]);

	return <></>;
};

export default LoginCallBackPage;
