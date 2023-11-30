import React, { useState } from 'react';
import { AuditDocumentBodyAttachmentStyle } from './attachment.style';
import { Modal } from 'component/modal';

const AuditDocumentBodyAttachment = (props: { attachmentId: string | undefined }) => {
	const { attachmentId } = props;
	const [isModalOpened, setIsModalOpened] = useState(false);
	const src = `${process.env.REACT_APP_S3_BUCKET_URL}/attachment/w512/${attachmentId}` || '';

	return (
		<>
			<div className={AuditDocumentBodyAttachmentStyle}>
				<div>
					<span>첨 부 사 진</span>
				</div>
				<div>{attachmentId ? <img src={src} alt="attachmentId" /> : null}</div>
			</div>
			{isModalOpened && (
				<Modal setIsModalOpened={setIsModalOpened}>
					<img
						src={src}
						alt="attachmentId"
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

export default AuditDocumentBodyAttachment;
