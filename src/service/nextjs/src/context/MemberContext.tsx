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
import { ClubContext } from './ClubContext';

export type Member = {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	role: string;
	participation: number;
	introduction: string;
};

export const MemberContext = createContext<{
	members: Member[] | null;
	setMembers: Dispatch<SetStateAction<Member[] | null>>;
}>({
	members: null,
	setMembers: () => {},
});

export const MemberProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const { me } = useContext(AuthContext);
	const { club } = useContext(ClubContext);
	const [members, setMembers] = useState<Member[] | null>(null);

	useEffect(() => {
		if (me && club) {
			axios
				.get(`${process.env.REACT_APP_NESTJS_URL}/club/${club._id}/member`, {
					withCredentials: true,
				})
				.then(response => {
					setMembers(response.data);
				})
				.catch(() => {
					setMembers(null);
				});
		} else {
			setMembers(null);
		}
	}, [me, club]);

	return (
		<MemberContext.Provider value={{ members, setMembers }}>{children}</MemberContext.Provider>
	);
};
