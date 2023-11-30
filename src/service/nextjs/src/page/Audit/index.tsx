import React, { useContext } from 'react';
import AuditPageStyle from './index.style';
import AuditPageHeader from './Header';
import AuditPageBody from './body';
import { ClubContext } from 'context/ClubContext';

const AuditPage = () => {
	const { club, setClub } = useContext(ClubContext);

	if (!club) {
		return null;
	}

	return (
		<div className={AuditPageStyle}>
			<AuditPageHeader club={club} />
			<AuditPageBody club={club} />
		</div>
	);
	console.log(setClub);
};

export default AuditPage;
