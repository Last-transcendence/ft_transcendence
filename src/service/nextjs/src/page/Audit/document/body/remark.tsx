import React, { Dispatch, SetStateAction } from 'react';
import { AuditDocumentBodyRemarkStyle } from './remark.style';

const AuditDocumentBodyRemark = (props: {
	remark: string;
	isEditting?: boolean;
	setRemark?: Dispatch<SetStateAction<string>>;
}) => {
	const { remark, isEditting = false, setRemark = undefined } = props;

	return (
		<div className={AuditDocumentBodyRemarkStyle}>
			<div>
				<span>비 고</span>
			</div>
			<div>
				{isEditting && setRemark ? (
					<textarea value={remark} onChange={event => setRemark(event.target.value)} />
				) : (
					<span>{remark}</span>
				)}
			</div>
		</div>
	);
};

export default AuditDocumentBodyRemark;
