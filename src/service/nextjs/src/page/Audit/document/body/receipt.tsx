import React, { useState } from 'react';
import AuditDocumentBodyReceiptStyle from './receipt.style';
import { Modal } from 'component/modal';

const AuditDocumentBodyReceipt = (props: { receiptId: string }) => {
	const { receiptId } = props;
	const [isModalOpened, setIsModalOpened] = useState(false);
	const src = `${process.env.REACT_APP_S3_BUCKET_URL}/receipt/w512/${receiptId}` || '';

	return (
		<>
			<div className={AuditDocumentBodyReceiptStyle}>
				<div>
					<span>영 수 증</span>
				</div>
				<div>
					<img src={src} alt="receiptId" onClick={() => setIsModalOpened(true)} />
				</div>
			</div>
			{isModalOpened && (
				<Modal setIsModalOpened={setIsModalOpened}>
					<img
						src={src}
						alt="receiptId"
						style={{
							maxWidth: '90vw',
							maxHeight: '90vh',
							cursor: 'zoom-out',
						}}
						onClick={() => setIsModalOpened(false)}
					/>
				</Modal>
			)}
		</>
	);
};

export default AuditDocumentBodyReceipt;
