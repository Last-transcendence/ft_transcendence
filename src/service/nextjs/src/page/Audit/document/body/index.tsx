import React, { Dispatch, SetStateAction } from 'react';
import { AuditDocumentBodyStyle } from './index.style';
import AuditDocumentBodyTitle from './title';
import AuditDocumentBodyDate from './date';
import AuditDocumentBodyFranchise from './franchise';
import AuditDocumentBodyAmount from './amount';
import AuditDocumentBodyBalance from './balance';
import AuditDocumentBodyRemark from './remark';
import AuditDocumentBodyReceipt from './receipt';
import AuditDocumentBodyCardSlip from './card-slip';
import AuditDocumentBodyAttachment from './attachment';

const AuditDocumentBody = (props: {
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
	setTitle?: Dispatch<SetStateAction<string>>;
	setDate?: Dispatch<SetStateAction<string>>;
	setFranchise?: Dispatch<SetStateAction<string>>;
	setAmount?: Dispatch<SetStateAction<string>>;
	setIsExpense?: Dispatch<SetStateAction<boolean>>;
	setBalance?: Dispatch<SetStateAction<string>>;
	setRemark?: Dispatch<SetStateAction<string>>;
}) => {
	const {
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
		setTitle = undefined,
		setDate = undefined,
		setFranchise = undefined,
		setAmount = undefined,
		setIsExpense = undefined,
		setBalance = undefined,
		setRemark = undefined,
	} = props;

	return (
		<div className={AuditDocumentBodyStyle}>
			<AuditDocumentBodyTitle title={title} isEditting={isEditting} setTitle={setTitle} />
			<div>
				<AuditDocumentBodyDate date={date} isEditting={isEditting} setDate={setDate} />
				<AuditDocumentBodyFranchise franchise={franchise} isEditting={isEditting} setFranchise={setFranchise} />
			</div>
			<div>
				<AuditDocumentBodyAmount
					amount={amount}
					isExpense={isExpense}
					isEditting={isEditting}
					setAmount={setAmount}
					setIsExpense={setIsExpense}
				/>
				<AuditDocumentBodyBalance balance={balance} isEditting={isEditting} setBalance={setBalance} />
			</div>
			<AuditDocumentBodyRemark remark={remark} isEditting={isEditting} setRemark={setRemark} />
			<div>
				<AuditDocumentBodyReceipt receiptId={receiptId} />
				<AuditDocumentBodyCardSlip cardSlipId={cardSlipId} />
			</div>
			<AuditDocumentBodyAttachment attachmentId={attachmentId} />
		</div>
	);
};

export default AuditDocumentBody;
