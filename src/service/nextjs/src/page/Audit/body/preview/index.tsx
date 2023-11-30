import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import AuditDocumentPreviewStyle from './index.style';
import { Modal } from 'component/modal';
import AuditDocumentViewer from '../viewer';
import { Audit } from 'context/AuditContext';
import axios from 'axios';
import { ClubContext } from 'context/ClubContext';

const AuditDocumentPreview = (props: {
	index: number;
	audit: Audit;
	audits: Audit[];
	setAudits: Dispatch<SetStateAction<Audit[] | null>>;
}) => {
	const { index, audit, audits, setAudits } = props;
	const [newAudit, setNewAudit] = useState<Audit>(audit);
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [isEditting, setIsEditting] = useState(false);
	const { club } = useContext(ClubContext);
	const src = (
		audit.attachmentId
			? `${process.env.REACT_APP_S3_BUCKET_URL}/attachment/w512/${audit.attachmentId}`
			: `${process.env.REACT_APP_S3_BUCKET_URL}/receipt/w512/${audit.receiptId}`
	) as string;

	useEffect(() => {
		if (!isModalOpened || !isEditting) {
			setIsEditting(false);

			if (audit === newAudit) {
				return;
			}

			const parsedAudit = {
				...newAudit,
				amount: parseInt(newAudit.amount),
				balance: parseInt(newAudit.balance),
			};

			axios
				.patch(
					`${process.env.REACT_APP_NESTJS_URL}/club/${club?._id}/audit/${newAudit._id}`,
					parsedAudit,
					{ withCredentials: true },
				)
				.then(response => {
					if (response.data) {
						setAudits(
							audits?.map(audit => {
								if (audit._id === newAudit._id) {
									return newAudit;
								} else {
									return audit;
								}
							}),
						);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [isModalOpened, isEditting]);

	return (
		<>
			<div className={AuditDocumentPreviewStyle} onClick={() => setIsModalOpened(true)}>
				<div>
					<img src={src} />
				</div>
				<div>{audit.title}</div>
			</div>
			{isModalOpened && (
				<Modal setIsModalOpened={setIsModalOpened}>
					<AuditDocumentViewer
						index={index}
						newAudit={newAudit}
						setNewAudit={setNewAudit}
						isEditting={isEditting}
						setIsEditting={setIsEditting}
					/>
				</Modal>
			)}
		</>
	);
	console.log(audit, audits, setAudits);
};

export default AuditDocumentPreview;
