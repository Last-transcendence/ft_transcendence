import { Audit } from 'context/AuditContext';
import { Club } from 'context/ClubContext';
import React from 'react';
import {
	AuditExportSummaryAfterFirstPageStyle,
	AuditExportSummaryFirstPageStyle,
} from './index.style';

const Title = (props: { clubName: string }) => {
	const { clubName } = props;

	return (
		<div>
			<span>( {clubName} ) 회계 장부</span>
		</div>
	);
};

const MetaData = (props: { clubName: string }) => {
	const { clubName } = props;
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const date = new Date().getDate();

	return (
		<div>
			<div>
				<div>
					<span>동아리 명</span>
				</div>
				<div>
					<span>{clubName}</span>
				</div>
			</div>
			<div>
				<div>
					<span>책 임 자</span>
				</div>
				<div>
					<span>장시아</span>
				</div>
			</div>
			<div>
				<div>
					<span>작성일자</span>
				</div>
				<div>
					<span>
						{year}년 {month}월 {date}일
					</span>
				</div>
			</div>
		</div>
	);
};

const Header = () => {
	return (
		<div>
			<div>
				<div>
					<span>번호</span>
				</div>
				<div>
					<span>날 짜</span>
				</div>
				<div>
					<span>회 계 명</span>
				</div>
				<div>
					<span>상 호 명</span>
				</div>
				<div>
					<span>지 출</span>
				</div>
				<div>
					<span>수 입</span>
				</div>
				<div>
					<span>잔 액</span>
				</div>
			</div>
			<div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

const Summary = (props: { index: number | null; audit: Audit | null }) => {
	const { index, audit } = props;

	if (!index || !audit) {
		return (
			<div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}

	return (
		<div>
			<div>
				<span>{index}</span>
			</div>
			<div>
				<span>{audit.created}</span>
			</div>
			<div>
				<span>{audit.title}</span>
			</div>
			<div>
				<span>{audit.franchise}</span>
			</div>
			<div>
				<span>{audit.isExpense ? audit.amount : ''}</span>
			</div>
			<div>
				<span>{!audit.isExpense ? audit.amount : ''}</span>
			</div>
			<div>
				<span>{audit.balance}</span>
			</div>
		</div>
	);
};

const FirstPage = (props: { club: Club; audits: Audit[]; className?: string }) => {
	const { club, audits, className = undefined } = props;
	const rowNum = 26;
	const emptySummary = [...Array(26 < audits.length ? 0 : rowNum - audits.length)].map(
		(_, index) => {
			return <Summary key={index} index={null} audit={null} />;
		},
	);

	return (
		<div className={className}>
			<div>
				<div></div>
				<Title clubName={club.name} />
				<MetaData clubName={club.name} />
			</div>
			<div>
				<Header />
				{audits.slice(0, rowNum).map((audit, index) => {
					return <Summary key={index} index={index + 1} audit={audit} />;
				})}
				{audits.length < rowNum ? emptySummary : null}
			</div>
		</div>
	);
};

const AfterFirstPage = (props: { pageIndex: number; audits: Audit[]; className?: string }) => {
	const { pageIndex, audits, className = undefined } = props;
	const rowNum = 30;
	const curAudits = audits.slice(26 + pageIndex * rowNum, 26 + (pageIndex + 1) * rowNum);
	const emptySummary = [...Array(rowNum - curAudits.length)].map((_, index) => {
		return <Summary key={index} index={null} audit={null} />;
	});

	return (
		<div className={className}>
			{curAudits.map((audit, index) => {
				return <Summary key={index} index={26 + pageIndex * rowNum + index + 1} audit={audit} />;
			})}
			{curAudits.length < rowNum ? emptySummary : null}
		</div>
	);
};

const AuditExportSummaryPage = (props: { club: Club; audits: Audit[] }) => {
	const { club, audits } = props;
	const numOfSummaryPages = audits.length < 26 ? 1 : Math.floor((audits.length - 26) / 30) + 2;

	return (
		<>
			<FirstPage club={club} audits={audits} className={AuditExportSummaryFirstPageStyle} />
			{[...Array(numOfSummaryPages - 1)].map((_, index) => {
				return (
					<AfterFirstPage
						key={index}
						pageIndex={index}
						audits={audits}
						className={AuditExportSummaryAfterFirstPageStyle}
					/>
				);
			})}
		</>
	);
};

export default AuditExportSummaryPage;
