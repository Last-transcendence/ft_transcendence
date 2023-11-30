import React, { Dispatch, SetStateAction } from 'react';
import { AuditDocumentBodyTitleStyle } from './title.style';

const AuditDocumentBodyTitle = (props: {
	title: string;
	isEditting?: boolean;
	setTitle?: Dispatch<SetStateAction<string>>;
}) => {
	const { title, isEditting = false, setTitle = undefined } = props;

	return (
		<div className={AuditDocumentBodyTitleStyle}>
			<div>
				<span>제 목</span>
			</div>
			<div>
				{isEditting && setTitle ? (
					<input type="text" value={title} onChange={event => setTitle(event.target.value)} />
				) : (
					<span>{title}</span>
				)}
			</div>
		</div>
	);
};

export default AuditDocumentBodyTitle;
