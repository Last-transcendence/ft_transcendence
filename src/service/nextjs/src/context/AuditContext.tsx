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

export type Audit = {
	_id: Types.ObjectId;
	auditor: string;
	created: string;
	title: string;
	date: string;
	franchise: string;
	amount: string;
	isExpense: boolean;
	balance: string;
	remark: string;
	receiptId: Types.ObjectId;
	cardSlipId: Types.ObjectId;
	attachmentId: Types.ObjectId;
};

export const AuditContext = createContext<{
	audits: Audit[] | null;
	setAudits: Dispatch<SetStateAction<Audit[] | null>>;
}>({
	audits: null,
	setAudits: () => {},
});

export const AuditProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const { me } = useContext(AuthContext);
	const { club } = useContext(ClubContext);
	const [audits, setAudits] = useState<Audit[] | null>(null);

	useEffect(() => {
		if (me && club) {
			axios
				.get(`${process.env.REACT_APP_NESTJS_URL}/club/${club._id}/audit`, {
					withCredentials: true,
				})
				.then(response => {
					setAudits(response.data);
				})
				.catch(() => {
					setAudits(null);
				});
		} else {
			setAudits(null);
		}
	}, [me, club]);

	return <AuditContext.Provider value={{ audits, setAudits }}>{children}</AuditContext.Provider>;
};
