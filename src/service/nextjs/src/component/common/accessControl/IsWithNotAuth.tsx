import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';
import { getFetcher } from '@/service/api';

const IsWithNotAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const [on, setOn] = useState<boolean>(false);
		const router = useRouter();

		useEffect(() => {
			getFetcher('/user/me')
				.then(response => {
					console.log(response);
					alert('잘못된 접근입니다.');
					router.push('/');
				})
				.catch(error => {
					setOn(true);
				});
		}, [router]);

		if (on === true) {
			return <Destination {...props} />;
		}
	};

	return WrappedComponent;
};

export default IsWithNotAuth;
