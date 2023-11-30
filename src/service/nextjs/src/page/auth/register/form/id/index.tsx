import axios from 'axios';
import React, { Dispatch, MouseEvent, RefObject, SetStateAction, useRef } from 'react';
import { RegisterFormPageIdInputStyle } from './index.style';
import CustomInput from 'component/input';
import { RegisterPageCustomInputStyle } from '../index.style';

const RegisterFormPageIdInput = (props: {
	id: string | undefined;
	setId: Dispatch<SetStateAction<string | undefined>>;
	setIsDuplicatedId: Dispatch<SetStateAction<boolean>>;
}) => {
	const { id, setId, setIsDuplicatedId } = props;
	const duplicateCheckSpanRef = useRef<HTMLSpanElement>(null);
	const handleClick = (
		event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		setIsDuplicatedId: Dispatch<SetStateAction<boolean>>,
		duplicateCheckSpanRef: RefObject<HTMLSpanElement>,
	) => {
		event.preventDefault();

		axios
			.post(`${process.env.REACT_APP_NESTJS_URL}/user`, { id })
			.then(() => {
				setIsDuplicatedId(true);
				if (duplicateCheckSpanRef.current) {
					duplicateCheckSpanRef.current.style.display = 'block';
					duplicateCheckSpanRef.current.style.color = 'red';
					duplicateCheckSpanRef.current.innerText = '이미 사용중인 아이디 입니다';
				}
			})
			.catch(() => {
				setIsDuplicatedId(false);
				if (duplicateCheckSpanRef.current) {
					duplicateCheckSpanRef.current.style.display = 'block';
					duplicateCheckSpanRef.current.style.color = '#36E136';
					duplicateCheckSpanRef.current.innerText = '사용 가능한 아이디 입니다';
				}
			});
	};

	return (
		<div className={RegisterFormPageIdInputStyle}>
			<div>
				<CustomInput
					type="text"
					label="아이디"
					value={id}
					setValue={setId}
					className={RegisterPageCustomInputStyle}
				/>
				<div
					onClick={event => {
						handleClick(event, setIsDuplicatedId, duplicateCheckSpanRef);
					}}
				>
					<span>중복확인</span>
				</div>
			</div>
			<span ref={duplicateCheckSpanRef}></span>
		</div>
	);
};

export default RegisterFormPageIdInput;
