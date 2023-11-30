import React, {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	ReactNode,
	PropsWithChildren,
	FC,
} from 'react';
import { Types } from 'mongoose';
import { removeCookie, setCookie } from 'component/cookie';
import axios from 'axios';

export const AuthContext = createContext<{
	me: User | null;
	setMe: Dispatch<SetStateAction<User | null>>;
}>({
	me: null,
	setMe: () => {},
});

export type User = {
	_id: Types.ObjectId;
	name: string;
	id: string;
	password: string;
	email: string;
	major: string | undefined;
	studentId: string | undefined;
	phoneNumber: string | undefined;
	sns: string | undefined;
	profileImageId: Types.ObjectId | null;
	clubs: Types.ObjectId[] | null;
};

interface AuthProviderProps
	extends PropsWithChildren<{
		children: ReactNode;
	}> {}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [me, setMe] = useState<User | null>(null);

	useEffect(() => {
		if (!me) {
			axios
				.get(`${process.env.REACT_APP_NESTJS_URL}/user/me`, {
					withCredentials: true,
				})
				.then(response => {
					setMe(response.data);
					setCookie('userId', response.data._id, { path: '/' });
				})
				.catch(() => {
					setMe(null);
					removeCookie('userId', { path: '/' });
				});
		}
	}, []);

	return <AuthContext.Provider value={{ me, setMe }}>{children}</AuthContext.Provider>;
};
