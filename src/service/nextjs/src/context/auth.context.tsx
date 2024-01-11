import {
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';
import axios from 'axios';
import Me from '@/type/me.type';

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
			axios
				.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, { withCredentials: true })
				.then(response => {
					setMe(response.data);
				})
				.catch(error => {
					setMe(null);
					console.error(error);
				});
		}
	}, [me]);

	return <AuthContext.Provider value={{ me, setMe }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
