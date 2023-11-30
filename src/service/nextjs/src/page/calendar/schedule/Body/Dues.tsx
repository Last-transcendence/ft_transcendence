import React from 'react';
import {
	ButtonContainer,
	ButtonRowStyle,
	ButtonStyle,
	DuesContainerStyle,
	InputFeeAmountContainer,
	ShowFeeAmountContainer,
} from './Dues.style';
import { TitleContainer } from './TitleContainer';
import { DuesIcon } from './icon';

const Dues = (props: { setFeeAmount: React.Dispatch<React.SetStateAction<number>> }) => {
	const { setFeeAmount } = props;
	const [currFeeAmount, setCurrSetFeeAmount] = React.useState<string>('');

	const PlusFeeAmountBtn = (props: { fee: number }) => {
		const { fee } = props;
		return (
			<button
				onClick={() => {
					const numericCurrFee = Number(currFeeAmount.replace(/,/g, ''));
					const newFeeAmount = numericCurrFee + fee;
					setFeeAmount(newFeeAmount);
					setCurrSetFeeAmount(newFeeAmount.toLocaleString());
				}}
				className={ButtonStyle}
				style={{ marginRight: '10px' }}
			>
				+ {fee.toLocaleString()}
			</button>
		);
	};

	const MinusFeeAmountBtn = (props: { fee: number }) => {
		const { fee } = props;
		return (
			<button
				onClick={() => {
					const numericCurrFee = Number(currFeeAmount.replace(/,/g, ''));
					const newFeeAmount = numericCurrFee - fee;
					setFeeAmount(newFeeAmount);
					setCurrSetFeeAmount(newFeeAmount.toLocaleString());
				}}
				className={ButtonStyle}
				style={{ marginRight: '10px' }}
			>
				- {fee.toLocaleString()}
			</button>
		);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, '');

		if (value === '') {
			setCurrSetFeeAmount('');
			setFeeAmount(0);
		} else {
			// 입력값이 있으면 숫자로 변환하여 상태 업데이트
			const numericValue = parseInt(value, 10);
			const formattedValue = numericValue.toLocaleString();

			setCurrSetFeeAmount(formattedValue);
			setFeeAmount(numericValue);
		}
	};
	const inputWidth = currFeeAmount.length * 10;
	return (
		<div className={DuesContainerStyle}>
			<TitleContainer
				titleIcon={<DuesIcon width={27} height={27} />}
				title="예상 회비"
				subtitle="금액을 입력해주세요"
			/>
			<div className={InputFeeAmountContainer}>
				<div className={ShowFeeAmountContainer}>
					<div>
						<input
							type="text"
							value={currFeeAmount}
							onChange={handleChange}
							style={{ width: currFeeAmount.length === 0 ? '50%' : `${inputWidth}px` }}
							placeholder="금액을 입력해주세요"
						/>
						{currFeeAmount && <span>원</span>}
						{/* 나머지 버튼들 */}
					</div>
				</div>

				<div className={ButtonContainer}>
					<div className={ButtonRowStyle}>
						<PlusFeeAmountBtn fee={1000} />
						<MinusFeeAmountBtn fee={1000} />
					</div>
					<div className={ButtonRowStyle}>
						<PlusFeeAmountBtn fee={5000} />
						<MinusFeeAmountBtn fee={5000} />
					</div>
					<div className={ButtonRowStyle}>
						<PlusFeeAmountBtn fee={10000} />
						<MinusFeeAmountBtn fee={10000} />
					</div>
					<div className={ButtonRowStyle}>
						<PlusFeeAmountBtn fee={50000} />
						<MinusFeeAmountBtn fee={50000} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dues;
