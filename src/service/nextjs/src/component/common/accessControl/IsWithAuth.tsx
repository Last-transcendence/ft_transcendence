import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';
import { postFetcher } from '@/service/api';

const IsWithAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const router = useRouter();
		const { me } = useContext(AuthContext);
		const [isLoaded, setIsLoaded] = useState<boolean>(false);

		useEffect(() => {
			setTimeout(() => {
				setIsLoaded(true);
			}, 150);
			if (isLoaded) {
				if (!me) {
					alert('로그인이 필요합니다.');
					router.push('/auth/login');
				} else {
					postFetcher('/user/online');
				}
			}
		}, [me, router, isLoaded, setIsLoaded]);

		return <Destination {...props} />;
	};

	return WrappedComponent;
};

export default IsWithAuth;
