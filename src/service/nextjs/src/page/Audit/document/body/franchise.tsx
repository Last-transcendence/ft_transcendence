import React, { Dispatch, SetStateAction } from 'react';
import { AuditDocumentBodyFranchiseStyle } from './franchise.style';

const AuditDocumentBodyFranchise = (props: {
	franchise: string;
	isEditting?: boolean;
	setFranchise?: Dispatch<SetStateAction<string>>;
}) => {
	const { franchise, isEditting = false, setFranchise = undefined } = props;

	return (
		<div className={AuditDocumentBodyFranchiseStyle}>
			<div>
				<span>상호명</span>
			</div>
			<div>
				{isEditting && setFranchise ? (
					<input
						type="text"
						value={franchise}
						onChange={event => setFranchise(event.target.value)}
					/>
				) : (
					<span>{franchise}</span>
				)}
			</div>
		</div>
	);
};

export default AuditDocumentBodyFranchise;
