import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';
import { postFetcher } from '@/service/api';

const IsWithAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const router = useRouter();
		const { me, setMe } = useContext(AuthContext);
		const [isLoaded, setIsLoaded] = useState<boolean>(false);
		const [goPage, setGoPage] = useState<Boolean>(false);

		useEffect(() => {
			setTimeout(() => {
				setIsLoaded(true);
			}, 150);
			const accessControl = async (me : any) => {
				try {
					if (!me) {
						alert('로그인이 필요합니다.');
						router.push('/auth/login');
					} else {
						await postFetcher('/user/online');
						setGoPage(true);
					}
				} catch (error) {
					setMe(null);
					router.push('/auth/login');
				}
			}
		if (isLoaded) {
			accessControl(me);
		}
		}, [me, router, isLoaded, setIsLoaded]);

		return goPage && <Destination {...props} />;
	};

	return WrappedComponent;
};

export default IsWithAuth;
