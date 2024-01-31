import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';
import { postFetcher } from '@/service/api';
import { UserStatus } from '@/type';

const IsWithAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const router = useRouter();
		const { me, setMe } = useContext(AuthContext);
		const [isLoaded, setIsLoaded] = useState<boolean>(false);
		const [goPage, setGoPage] = useState<boolean>(false);

		setTimeout(() => {
			setIsLoaded(true);
		}, 500);
		useEffect(() => {
			if (isLoaded) {
				if (!me) {
					alert('로그인이 필요합니다.');
					router.push('/auth/login');
				} else {
					postFetcher('/user/online')
						.then(() => {
							setMe({ ...me, status: UserStatus.ONLINE });
						})
						.catch(() => {
							setMe(null);
							router.push('/auth/login');
						});
					setGoPage(true);
				}
			}
		}, [me, setMe, isLoaded, router]);

		return goPage && <Destination {...props} />;
	};

	return WrappedComponent;
};

export default IsWithAuth;
