import React, { Dispatch, SetStateAction } from 'react';
import AuditDocumentStyle from './index.style';
import AuditDocumentHeader from './header';
import AuditDocumentBody from './body';

const AuditDocument = (props: {
	index: number | null;
	clubName: string;
	auditor: string;
	created: string;
	title: string;
	date: string;
	franchise: string;
	amount: string;
	isExpense: boolean;
	balance: string;
	remark: string;
	receiptId: string;
	cardSlipId: string;
	attachmentId: string | undefined;
	isEditting?: boolean;
	setAuditor?: Dispatch<SetStateAction<string>>;
	setCreated?: Dispatch<SetStateAction<string>>;
	setTitle?: Dispatch<SetStateAction<string>>;
	setDate?: Dispatch<SetStateAction<string>>;
	setFranchise?: Dispatch<SetStateAction<string>>;
	setAmount?: Dispatch<SetStateAction<string>>;
	setIsExpense?: Dispatch<SetStateAction<boolean>>;
	setBalance?: Dispatch<SetStateAction<string>>;
	setRemark?: Dispatch<SetStateAction<string>>;
	className?: string;
}) => {
	const {
		index,
		clubName,
		auditor,
		created,
		title,
		date,
		franchise,
		amount,
		isExpense,
		balance,
		remark,
		receiptId,
		cardSlipId,
		attachmentId,
		isEditting = false,
		setAuditor = undefined,
		setCreated = undefined,
		setTitle = undefined,
		setDate = undefined,
		setFranchise = undefined,
		setAmount = undefined,
		setIsExpense = undefined,
		setBalance = undefined,
		setRemark = undefined,
		className = AuditDocumentStyle,
	} = props;

	return (
		<div className={className}>
			<div>
				<AuditDocumentHeader
					index={index}
					clubName={clubName}
					auditor={auditor}
					created={created}
					isEditting={isEditting}
					setAuditor={setAuditor}
					setCreated={setCreated}
				/>
				<AuditDocumentBody
					title={title}
					date={date}
					franchise={franchise}
					amount={amount}
					isExpense={isExpense}
					balance={balance}
					remark={remark}
					receiptId={receiptId}
					cardSlipId={cardSlipId}
					attachmentId={attachmentId}
					isEditting={isEditting}
					setTitle={setTitle}
					setDate={setDate}
					setFranchise={setFranchise}
					setAmount={setAmount}
					setIsExpense={setIsExpense}
					setBalance={setBalance}
					setRemark={setRemark}
				/>
			</div>
		</div>
	);
};

export default AuditDocument;
