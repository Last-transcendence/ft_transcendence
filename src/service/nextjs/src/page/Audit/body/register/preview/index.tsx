import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AuditRegisterPreviewStyle } from './index.style';
import { Modal } from 'component/modal';
import axios from 'axios';
import { Club, ClubContext } from 'context/ClubContext';
import { Types } from 'mongoose';
import { AuthContext } from 'context/AuthContext';
import { Audit, AuditContext } from 'context/AuditContext';

const handleSubmit = (
	auditor: string,
	clubId: Types.ObjectId,
	setClub: Dispatch<SetStateAction<Club | null>>,
	title: string | undefined,
	franchise: string | undefined,
	date: string | undefined,
	amount: string | undefined,
	balance: number,
	receiptId: string | undefined,
	cardSlipId: string | undefined,
	attachmentId: string | undefined,
	remark: string | undefined,
	audits: Audit[] | null,
	setAudits: Dispatch<SetStateAction<Audit[] | null>>,
	setIsModalOpened: Dispatch<SetStateAction<boolean>>,
) => {
	// 부스 체험 용 validation
	if (!title || !franchise || !date || !amount || !receiptId) {
		alert('모든 항목을 입력해주세요.');
		return;
	}
	// 원본
	//if (!title || !franchise || !date || !amount || !receiptId || !cardSlipId) {
	//	alert('모든 항목을 입력해주세요.');
	//	return;
	//}

	const created = new Date().toISOString().slice(0, 10);

	axios
		.post(
			`${process.env.REACT_APP_NESTJS_URL}/club/${clubId}/audit`,
			{
				auditor,
				created,
				title,
				date,
				franchise,
				amount: parseInt(amount),
				isExpense: true,
				balance: balance - parseInt(amount),
				receiptId,
				cardSlipId,
				attachmentId,
				remark,
			},
			{ withCredentials: true },
		)
		.then(response => {
			setClub(response.data.club);
			setAudits([...audits!, response.data.audit]);
		})
		.catch(error => {
			console.error(error);
			alert(error.response.data.message);
		});

	setIsModalOpened(false);
};

const AuditRegisterPreview = (props: {
	title: string | undefined;
	setTitle: Dispatch<SetStateAction<string | undefined>>;
	franchise: string | undefined;
	setFranchise: Dispatch<SetStateAction<string | undefined>>;
	date: string | undefined;
	setDate: Dispatch<SetStateAction<string | undefined>>;
	amount: string | undefined;
	setAmount: Dispatch<SetStateAction<string | undefined>>;
	receiptSrc: string | undefined;
	receiptId: string | undefined;
	cardSlipSrc: string | undefined;
	cardSlipId: string | undefined;
	attachmentSrc: string | undefined;
	attachmentId: string | undefined;
	remark: string | undefined;
	setRemark: Dispatch<SetStateAction<string | undefined>>;
	setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const {
		title,
		setTitle,
		franchise,
		setFranchise,
		date,
		setDate,
		amount,
		setAmount,
		receiptSrc,
		receiptId,
		cardSlipSrc,
		cardSlipId,
		attachmentSrc,
		attachmentId,
		remark,
		setRemark,
		setIsModalOpened,
	} = props;
	const [previewModalIsOpened, setPreviewModalIsOpened] = useState<boolean>(false);
	const { me } = useContext(AuthContext);
	const { club, setClub } = useContext(ClubContext);
	const { audits, setAudits } = useContext(AuditContext);

	if (!me || !club) {
		return null;
	}

	return (
		<>
			<div className={AuditRegisterPreviewStyle}>
				<div>
					<div>
						<div>
							<div>
								<span>제 목</span>
							</div>
							<div>
								<input
									type={'text'}
									value={title}
									onChange={event => setTitle(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<div>
								<span>상호명</span>
							</div>
							<div>
								<input
									type={'text'}
									value={franchise}
									onChange={event => setFranchise(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<div>
								<span>일 자</span>
							</div>
							<div>
								<input type={'date'} value={date} onChange={event => setDate(event.target.value)} />
							</div>
						</div>
						<div>
							<div>
								<span>금 액</span>
							</div>
							<div>
								<input
									type={'text'}
									value={amount}
									onChange={event => setAmount(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<div>
								<div>
									<span>실물 영수증</span>
								</div>
								<div>
									<img src={receiptSrc} />
								</div>
							</div>
							<div>
								<div>
									<span>카드 전표</span>
								</div>
								<div>
									<img src={cardSlipSrc} />
								</div>
							</div>
							<div>
								<div>
									<span>첨부 사진</span>
								</div>
								<div>
									<img src={attachmentSrc} />
								</div>
							</div>
						</div>
						<div>
							<div>
								<span>메 모</span>
							</div>
							<div>
								<textarea
									value={remark}
									onChange={event => setRemark(event.target.value)}
								></textarea>
							</div>
						</div>
					</div>
					<div>
						<button
							onClick={() => {
								handleSubmit(
									me.name,
									club._id,
									setClub,
									title,
									franchise,
									date,
									amount,
									club?.balance,
									receiptId,
									cardSlipId,
									attachmentId,
									remark,
									audits,
									setAudits,
									setIsModalOpened,
								);
							}}
						>
							<span>등록하기</span>
						</button>
						<button
							onClick={() => {
								alert('업데이트 예정입니다!');
								//setPreviewModalIsOpened(true);
							}}
						>
							<span>미리보기</span>
						</button>
					</div>
				</div>
			</div>
			{previewModalIsOpened ? (
				<Modal setIsModalOpened={setPreviewModalIsOpened}>
					<div></div>
				</Modal>
			) : null}
		</>
	);
	console.log(
		title,
		setTitle,
		franchise,
		setFranchise,
		date,
		setDate,
		amount,
		setAmount,
		receiptId,
		cardSlipId,
		attachmentId,
		remark,
		setRemark,
		setIsModalOpened,
	);
};

export default AuditRegisterPreview;
