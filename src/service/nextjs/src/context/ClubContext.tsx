import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { AuthContext } from './AuthContext';
import { Types } from 'mongoose';
import axios from 'axios';
import { removeCookie, setCookie } from 'component/cookie';

export type Club = {
	_id: Types.ObjectId;
	name: string;
	introduction: string | undefined;
	rules: string | undefined;
	tags: string[];
	members: Types.ObjectId[];
	schedules: Types.ObjectId[];
	audits: Types.ObjectId[];
	reviews: Types.ObjectId[];
	totalBudget: number;
	balance: number;
};

export const ClubContext = createContext<{
	club: Club | null;
	setClub: Dispatch<SetStateAction<Club | null>>;
}>({
	club: null,
	setClub: () => {},
});

export const ClubProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [club, setClub] = useState<Club | null>(null);
	const { me } = useContext(AuthContext);

	useEffect(() => {
		if (me) {
			if (me.clubs && 0 < me.clubs.length) {
				axios
					.get(`${process.env.REACT_APP_NESTJS_URL}/club/${me.clubs[0]}`, {
						withCredentials: true,
					})
					.then(response => {
						setClub({
							_id: response.data._id,
							name: response.data.name,
							introduction: response.data.introduction,
							rules: response.data.rules,
							tags: response.data.tags,
							members: response.data.members,
							schedules: response.data.schedules,
							audits: response.data.audits,
							reviews: response.data.reviews,
							totalBudget: response.data.totalBudget,
							balance: response.data.balance,
						});
						setCookie('clubId', response.data._id, { path: '/' });
					})
					.catch(() => {
						setClub(null);
						removeCookie('clubId', { path: '/' });
					});
			} else {
				setClub(null);
				removeCookie('clubId', { path: '/' });
			}
		} else {
			setClub(null);
		}
	}, [me]);

	return <ClubContext.Provider value={{ club, setClub }}>{children}</ClubContext.Provider>;
};
