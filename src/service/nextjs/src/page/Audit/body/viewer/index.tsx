import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import AuditDocumentViewerStyle from './index.style';
import { ClubContext } from 'context/ClubContext';
import { Audit } from 'context/AuditContext';
import AuditDocumentViewerFooter from './footer';
import AuditDocument from 'page/Audit/document';

const AuditDocumentViewer = (props: {
	index: number;
	newAudit: Audit;
	setNewAudit: Dispatch<SetStateAction<Audit>>;
	isEditting: boolean;
	setIsEditting: Dispatch<SetStateAction<boolean>>;
}) => {
	const { index, newAudit, setNewAudit, isEditting, setIsEditting } = props;
	const [auditor, setAuditor] = useState<string>(newAudit.auditor);
	const [created, setCreated] = useState<string>(newAudit.created);
	const [title, setTitle] = useState<string>(newAudit.title);
	const [date, setDate] = useState<string>(newAudit.date);
	const [franchise, setFranchise] = useState<string>(newAudit.franchise);
	const [amount, setAmount] = useState<string>(newAudit.amount.toString());
	const [isExpense, setIsExpense] = useState<boolean>(newAudit.isExpense);
	const [balance, setBalance] = useState<string>(newAudit.balance.toString());
	const [remark, setRemark] = useState<string>(newAudit.remark);
	const viewerRef = useRef<HTMLDivElement>(null);
	const printRef = useRef<HTMLDivElement>(null);
	const { club } = useContext(ClubContext);
	if (!club) {
		return null;
	}

	useEffect(() => {
		if (printRef.current) {
			printRef.current.style.position = 'absolute';
			printRef.current.style.left = '100vw';
		}
		if (viewerRef.current) {
			const content = (viewerRef.current.children[0] as HTMLDivElement).children[0].cloneNode(
				true,
			) as HTMLDivElement;

			if (printRef.current) {
				printRef.current.appendChild(content);
			}
		}
	}, [printRef.current]);

	useEffect(() => {
		setNewAudit({
			...newAudit,
			auditor,
			created,
			title,
			date,
			franchise,
			amount,
			isExpense,
			balance,
			remark,
		});
	}, [auditor, created, title, date, franchise, amount, isExpense, balance, remark, isEditting]);

	return (
		<div ref={viewerRef} className={AuditDocumentViewerStyle}>
			<AuditDocument
				index={index}
				clubName={club.name}
				auditor={auditor}
				created={created}
				title={title}
				date={date}
				franchise={franchise}
				amount={amount}
				isExpense={isExpense}
				balance={balance}
				remark={remark}
				receiptId={newAudit.receiptId.toString()}
				cardSlipId={newAudit.cardSlipId?.toString() || ''}
				attachmentId={newAudit.attachmentId?.toString() || undefined}
				isEditting={isEditting}
				setAuditor={setAuditor}
				setCreated={setCreated}
				setTitle={setTitle}
				setDate={setDate}
				setFranchise={setFranchise}
				setAmount={setAmount}
				setIsExpense={setIsExpense}
				setBalance={setBalance}
				setRemark={setRemark}
			/>
			<AuditDocumentViewerFooter
				isEditting={isEditting}
				setIsEditting={setIsEditting}
				printRef={printRef}
			/>
			<div ref={printRef}></div>
		</div>
	);
};

export default AuditDocumentViewer;
