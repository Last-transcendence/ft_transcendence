import React, { useState } from 'react';
import { AuditRegisterBodyStyle, AuditRegisterStyle } from './index.style';
import AuditRegisterReceipt from './receipt';
import AuditRegisterCardSlip from './card-slip';
import AuditRegisterAttachment from './attachment';
import AuditRegisterPreview from './preview';

const AuditRegister = (props: {
	setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [pageIndex, setPageIndex] = useState(0);
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [franchise, setFranchise] = useState<string | undefined>(undefined);
	const [date, setDate] = useState<string | undefined>(undefined);
	const [amount, setAmount] = useState<string | undefined>(undefined);
	const [receiptSrc, setReceiptSrc] = useState<string | undefined>(undefined);
	const [receiptId, setReceiptId] = useState<string | undefined>(undefined);
	const [cardSlipSrc, setCardSlipSrc] = useState<string | undefined>(undefined);
	const [cardSlipId, setCardSlipId] = useState<string | undefined>(undefined);
	const [attachmentSrc, setAttachmentSrc] = useState<string | undefined>(undefined);
	const [attachmentId, setAttachmentId] = useState<string | undefined>(undefined);
	const [remark, setRemark] = useState<string | undefined>(undefined);
	const { setIsModalOpened } = props;

	const pages: JSX.Element[] = [
		<AuditRegisterReceipt
			key={0}
			className={AuditRegisterBodyStyle}
			setFranchise={setFranchise}
			setDate={setDate}
			setAmount={setAmount}
			src={receiptSrc}
			setSrc={setReceiptSrc}
			setId={setReceiptId}
			pageIndex={0}
			setPageIndex={setPageIndex}
		/>,
		<AuditRegisterCardSlip
			key={1}
			className={AuditRegisterBodyStyle}
			src={cardSlipSrc}
			setSrc={setCardSlipSrc}
			setId={setCardSlipId}
			pageIndex={1}
			setPageIndex={setPageIndex}
		/>,
		<AuditRegisterAttachment
			key={2}
			className={AuditRegisterBodyStyle}
			src={attachmentSrc}
			setSrc={setAttachmentSrc}
			setId={setAttachmentId}
			pageIndex={2}
			setPageIndex={setPageIndex}
		/>,
		<AuditRegisterPreview
			key={3}
			title={title}
			setTitle={setTitle}
			franchise={franchise}
			setFranchise={setFranchise}
			date={date}
			setDate={setDate}
			amount={amount}
			setAmount={setAmount}
			receiptSrc={receiptSrc}
			receiptId={receiptId}
			cardSlipSrc={cardSlipSrc}
			cardSlipId={cardSlipId}
			attachmentSrc={attachmentSrc}
			attachmentId={attachmentId}
			remark={remark}
			setRemark={setRemark}
			setIsModalOpened={setIsModalOpened}
		/>,
	];

	return (
		<div className={AuditRegisterStyle}>
			<div>
				<span>지출 등록</span>
			</div>
			{pages[pageIndex]}
		</div>
	);

	console.log(
		pageIndex,
		setPageIndex,
		title,
		setTitle,
		franchise,
		setFranchise,
		date,
		setDate,
		amount,
		setAmount,
		receiptId,
		setReceiptId,
		cardSlipId,
		setCardSlipId,
		attachmentId,
		setAttachmentId,
		remark,
		setRemark,
		setIsModalOpened,
	);
};

export default AuditRegister;
