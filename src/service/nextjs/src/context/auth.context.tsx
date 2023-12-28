import {
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';
import User from '@/type/user.type';
import axios from 'axios';

const AuthContext = createContext<{
	me: User | null;
	setMe: Dispatch<SetStateAction<User | null>>;
}>({
	me: null,
	setMe: () => {},
});

export const AuthProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [me, setMe] = useState<User | null>(null);

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
