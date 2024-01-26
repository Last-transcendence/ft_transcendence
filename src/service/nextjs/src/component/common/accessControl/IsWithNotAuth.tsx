import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';

const IsWithNotAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const router = useRouter();
		const { me } = useContext(AuthContext);
		const [isLoaded, setIsLoaded] = useState<boolean>(false);

		useEffect(() => {
			setTimeout(() => {
				setIsLoaded(true);
			}, 150);
			if (isLoaded) {
				if (me) {
					alert('잘못된 접근입니다.');
					router.push('/');
				}
			}
		}, [router, me, isLoaded, setIsLoaded]);

		return <Destination {...props} />;
	};

	return WrappedComponent;
};

export default IsWithNotAuth;
