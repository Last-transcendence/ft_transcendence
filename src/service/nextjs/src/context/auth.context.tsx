import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Me from '@/type/me.type';
import { getFetcher } from '@/service/api';

const AuthContext = createContext<{
	me: Me | null;
	setMe: Dispatch<SetStateAction<Me | null>>;
}>({
	me: null,
	setMe: () => {},
});

export const AuthProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [me, setMe] = useState<Me | null>(null);

	useEffect(() => {
		if (!me) {
			getFetcher('/user/me')
				.then((response: any) => {
					setMe(response);
				})
				.catch(error => {
					setMe(null);
				});
		}
	}, [me]);

	return <AuthContext.Provider value={{ me, setMe }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
