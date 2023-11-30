import React, { Dispatch, SetStateAction, useState } from 'react';
import { AuditDocumentBodyAmountStyle } from './amount.style';

const AuditDocumentBodyAmount = (props: {
	amount: string;
	isExpense: boolean;
	isEditting?: boolean;
	setAmount?: Dispatch<SetStateAction<string>>;
	setIsExpense?: Dispatch<SetStateAction<boolean>>;
}) => {
	const {
		amount,
		isExpense,
		isEditting = false,
		setAmount = undefined,
		setIsExpense = undefined,
	} = props;
	const [currentAmount, setCurrentAmount] = useState<string>(amount);

	return (
		<div className={AuditDocumentBodyAmountStyle}>
			<div>
				<span>금 액</span>
			</div>
			<div>
				{isEditting && setAmount ? (
					<input
						type="text"
						value={currentAmount}
						onChange={event => {
							setCurrentAmount(event.target.value);
						}}
						onBlur={() => {
							const regex = /\D/;

							if (regex.test(currentAmount)) {
								alert('숫자만 입력해주세요.');
								setCurrentAmount(amount);
								return;
							}
							setAmount(currentAmount);
						}}
					/>
				) : (
					<span>{amount}</span>
				)}
			</div>
			<div>
				<div>
					<span>지 출</span>
					<input
						type="radio"
						checked={isExpense}
						onChange={() => {
							if (isEditting && setIsExpense) {
								setIsExpense(true);
							}
						}}
					/>
				</div>
				<div>
					<span>수 입</span>
					<input
						type="radio"
						checked={!isExpense}
						onChange={() => {
							if (isEditting && setIsExpense) {
								setIsExpense(false);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default AuditDocumentBodyAmount;
