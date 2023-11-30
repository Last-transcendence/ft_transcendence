import React, { ChangeEvent, Dispatch, MouseEvent, RefObject, SetStateAction, useRef } from 'react';
import { RegisterPageCustomInputStyle } from '../index.style';
import CustomInput from 'component/input';
import { RegisterFormPagePasswordInputStyle } from './index.style';

const RegisterFormPagePasswordInput = (props: {
	password: string | undefined;
	setPassword: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { password, setPassword } = props;
	const customInputRef = useRef<HTMLInputElement>(null);
	const passwordCheckSpanRef = useRef<HTMLSpanElement>(null);
	const handleClick = (
		event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
		customInputRef: RefObject<HTMLInputElement>,
	) => {
		event.preventDefault();

		if (customInputRef.current) {
			const span = event.target as HTMLSpanElement;

			if (customInputRef.current.type === 'password') {
				customInputRef.current.type = 'text';
				span.innerText = '비밀번호 숨기기';
			} else {
				customInputRef.current.type = 'password';
				span.innerText = '비밀번호 보기';
			}
		}
	};
	const handleChange = (
		event: ChangeEvent<HTMLInputElement>,
		setValue: Dispatch<SetStateAction<string | undefined>>,
	) => {
		setValue(event.target.value);

		if (passwordCheckSpanRef.current) {
			if (event.target.value.length < 8) {
				passwordCheckSpanRef.current.style.display = 'block';
			} else {
				passwordCheckSpanRef.current.style.display = 'none';
			}
		}
	};
	const handleBlur = () => {
		if (passwordCheckSpanRef.current) {
			if (customInputRef.current) {
				if (customInputRef.current.value.length === 0) {
					passwordCheckSpanRef.current.style.display = 'none';
				}
			}
		}
	};

	return (
		<div className={RegisterFormPagePasswordInputStyle}>
			<CustomInput
				type="password"
				label="비밀번호"
				value={password}
				setValue={setPassword}
				inputRef={customInputRef}
				onChange={handleChange}
				onBlur={handleBlur}
				className={RegisterPageCustomInputStyle}
			/>
			<div>
				<span
					onClick={event => {
						handleClick(event, customInputRef);
					}}
				>
					비밀번호 보기
				</span>
				<span ref={passwordCheckSpanRef}>비밀번호를 8자 이상으로 설정해주세요</span>
			</div>
		</div>
	);
};

export default RegisterFormPagePasswordInput;
