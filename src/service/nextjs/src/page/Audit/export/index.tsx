import React from 'react';
import AuditExportStyle, { AuditExportDocumentStyle } from './index.style';
import { RefObject } from '@fullcalendar/core/preact';
import { Club } from 'context/ClubContext';
import { Audit } from 'context/AuditContext';
import AuditExportSummaryPage from './summary';
import AuditDocument from '../document';

const AuditExport = (props: {
	divRef: RefObject<HTMLDivElement>;
	club: Club;
	audits: Audit[] | null;
}) => {
	const { divRef, club, audits } = props;
	if (!audits) {
		return null;
	}

	return (
		<div ref={divRef} className={AuditExportStyle}>
			<AuditExportSummaryPage club={club} audits={audits} />
			{audits.map((audit, index) => {
				return (
					<AuditDocument
						key={index}
						index={index}
						clubName={club.name}
						auditor={audit.auditor}
						created={audit.created}
						title={audit.title}
						date={audit.date}
						franchise={audit.franchise}
						amount={audit.amount}
						isExpense={audit.isExpense}
						balance={audit.balance}
						remark={audit.remark}
						receiptId={audit.receiptId.toString()}
						cardSlipId={audit.cardSlipId?.toString() || ''}
						attachmentId={audit.attachmentId?.toString() || ''}
						className={AuditExportDocumentStyle}
					/>
				);
			})}
		</div>
	);
};

export default AuditExport;
