import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';
import { getFetcher } from '@/service/api';

const IsWithAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const [on, setOn] = useState<boolean>(false);
		const router = useRouter();
		const { me } = useContext(AuthContext);

		useEffect(() => {
			const accessControl = async () => {
				try {
					const me = await getFetcher('user/me');
					setOn(true);
				} catch (error) {
					alert('로그인하셔야합니다.');
					router.push('/auth/login');
				}
			};

			if (me === null) {
				accessControl();
			} else {
				setOn(true);
			}
		}, [me, router]);

		if (on === true) {
			return <Destination {...props} />;
		}
	};

	return WrappedComponent;
};

export default IsWithAuth;
