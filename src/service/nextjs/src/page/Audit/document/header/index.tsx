import React, { Dispatch, SetStateAction, useState } from 'react';
import { AuditFormHeaderMetaStyle, AuditFormHeaderStyle } from './index.style';

const MetaData = (props: {
	clubName: string;
	auditor: string;
	created: string;
	isEditting?: boolean;
	setAuditor?: Dispatch<SetStateAction<string>>;
	setCreated?: Dispatch<SetStateAction<string>>;
}) => {
	const {
		clubName,
		auditor,
		created,
		isEditting = false,
		setAuditor = undefined,
		setCreated = undefined,
	} = props;
	const [currentCreated, setCurrentCreated] = useState<string>(created);

	return (
		<div className={AuditFormHeaderMetaStyle}>
			<div>
				<div>
					<span>동아리 명</span>
				</div>
				<div>
					<span>{clubName}</span>
				</div>
			</div>
			<div>
				<div>
					<span>작 성 자</span>
				</div>
				<div>
					{isEditting && setAuditor ? (
						<input type="text" value={auditor} onChange={event => setAuditor(event.target.value)} />
					) : (
						<span>{auditor}</span>
					)}
				</div>
			</div>
			<div>
				<div>
					<span>작성일자</span>
				</div>
				<div>
					<div>
						{isEditting && setCreated ? (
							<input
								type="text"
								value={currentCreated.split('-')[0]}
								onChange={event =>
									setCreated(
										event.target.value +
											'-' +
											currentCreated.split('-')[1] +
											'-' +
											currentCreated.split('-')[2],
									)
								}
								onBlur={() => {
									const regex = /^\d{4}$/;

									if (!regex.test(currentCreated.split('-')[0])) {
										alert('날짜는 yyyy-mm-dd 형식으로 입력해주세요.');
										setCurrentCreated(created);
										return;
									}
									setCreated(currentCreated);
								}}
							/>
						) : (
							<span>{currentCreated.split('-')[0]}</span>
						)}
						<span>년</span>
					</div>
					<div>
						{isEditting && setCreated ? (
							<input
								type="text"
								value={currentCreated.split('-')[1]}
								onChange={event =>
									setCreated(
										currentCreated.split('-')[0] +
											'-' +
											event.target.value +
											'-' +
											currentCreated.split('-')[2],
									)
								}
								onBlur={() => {
									const regex = /^\d{2}$/;

									if (!regex.test(currentCreated.split('-')[1])) {
										alert('날짜는 yyyy-mm-dd 형식으로 입력해주세요.');
										setCurrentCreated(created);
										return;
									}
									setCreated(currentCreated);
								}}
							/>
						) : (
							<span>{currentCreated.split('-')[1]}</span>
						)}
						<span>월</span>
					</div>
					<div>
						{isEditting && setCreated ? (
							<input
								type="text"
								value={currentCreated.split('-')[2]}
								onChange={event =>
									setCreated(
										currentCreated.split('-')[0] +
											'-' +
											currentCreated.split('-')[1] +
											'-' +
											event.target.value,
									)
								}
								onBlur={() => {
									const regex = /^\d{2}$/;

									if (!regex.test(currentCreated.split('-')[2])) {
										alert('날짜는 yyyy-mm-dd 형식으로 입력해주세요.');
										setCurrentCreated(created);
										return;
									}
									setCreated(currentCreated);
								}}
							/>
						) : (
							<span>{currentCreated.split('-')[2]}</span>
						)}
						<span>일</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const AuditDocumentHeader = (props: {
	index: number | null;
	clubName: string;
	auditor: string;
	created: string;
	isEditting?: boolean;
	setAuditor?: Dispatch<SetStateAction<string>>;
	setCreated?: Dispatch<SetStateAction<string>>;
}) => {
	const {
		index,
		clubName,
		auditor,
		created,
		isEditting = false,
		setAuditor = undefined,
		setCreated = undefined,
	} = props;

	return (
		<div className={AuditFormHeaderStyle}>
			{index !== null ? <span>[ {index + 1} ]</span> : <span></span>}
			<span>{`( ${clubName} )`} 회계 내역</span>
			<MetaData
				clubName={clubName}
				auditor={auditor}
				created={created}
				isEditting={isEditting}
				setAuditor={setAuditor}
				setCreated={setCreated}
			/>
		</div>
	);
};

export default AuditDocumentHeader;
