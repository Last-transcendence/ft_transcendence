import { useRouter } from 'next/router';
import { useContext, useEffect, ComponentType, useState } from 'react';
import AuthContext from '@/context/auth.context';

const IsWithNotAuth = <P extends object>(Destination: ComponentType<P>) => {
	const WrappedComponent = (props: P) => {
		const [on, setOn] = useState<boolean>(false);
		const router = useRouter();
		const { me } = useContext(AuthContext);

		useEffect(() => {
			if (me !== null) {
				alert('잘못된 접근입니다.');
				router.push('/');
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

export default IsWithNotAuth;
