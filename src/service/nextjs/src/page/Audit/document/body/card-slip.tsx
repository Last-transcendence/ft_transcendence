import React, { useState } from 'react';
import { AuditDocumentBodyCardSlipStyle } from './card-slip.style';
import { Modal } from '../../../../component/modal/index';

const AuditDocumentBodyCardSlip = (props: { cardSlipId: string }) => {
	const { cardSlipId } = props;
	const [isModalOpened, setIsModalOpened] = useState(false);
	const src = `${process.env.REACT_APP_S3_BUCKET_URL}/card-slip/w512/${cardSlipId}` || '';

	return (
		<>
			<div className={AuditDocumentBodyCardSlipStyle}>
				<div>
					<span>카 드 전 표</span>
				</div>
				<div>
					<img src={src} alt="card-slip" />
				</div>
			</div>
			{isModalOpened && (
				<Modal setIsModalOpened={setIsModalOpened}>
					<img
						src={src}
						alt="card-slip"
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

export default AuditDocumentBodyCardSlip;
