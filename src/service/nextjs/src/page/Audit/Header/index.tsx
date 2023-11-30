import React from 'react';
import { AuditPageHeaderStyle } from './index.style';
import { Club } from 'context/ClubContext';
import { PiggyBankIcon } from './icon';

const LeftSide = () => {
	return (
		<div>
			<PiggyBankIcon width={40} height={31} />
			<span>회계</span>
		</div>
	);
};

const RightSide = (props: { club: Club }) => {
	const { club } = props;

	return (
		<div>
			<div>
				<span>전체 공금</span>
				<span>{club.totalBudget}원</span>
			</div>
			<div>
				<span>남은 공금</span>
				<span>{club.balance}원</span>
			</div>
		</div>
	);
};

const AuditPageHeader = (props: { club: Club }) => {
	const { club } = props;

	if (!club) {
		return null;
	}

	return (
		<div className={AuditPageHeaderStyle}>
			<LeftSide />
			<RightSide club={club} />
		</div>
	);
};

export default AuditPageHeader;
