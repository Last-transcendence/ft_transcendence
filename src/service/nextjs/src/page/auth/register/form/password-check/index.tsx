import CustomInput from 'component/input';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { RegisterPageCustomInputStyle } from '../index.style';
import { RegisterFormPagePasswordCheckInputStyle } from './index.style';
import { ConfirmedIcon, UnconfirmedIcon } from './icon.style';

const RegisterFormPagePasswordCheckInput = (props: {
	password: string | undefined;
	passwordCheck: string | undefined;
	setPasswordCheck: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { password, passwordCheck, setPasswordCheck } = props;
	const divRef = useRef<HTMLDivElement>(null);
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setValue: Dispatch<SetStateAction<string | undefined>>,
	) => {
		setValue(event.target.value);

		if (divRef.current) {
			const confirmed = divRef.current.children[1] as SVGElement;
			const unconfirmed = divRef.current.children[2] as SVGElement;

			if (event.target.value !== password) {
				confirmed.style.display = 'none';
				unconfirmed.style.display = 'block';
			} else {
				confirmed.style.display = 'block';
				unconfirmed.style.display = 'none';
			}
		}
	};

	return (
		<div ref={divRef} className={RegisterFormPagePasswordCheckInputStyle}>
			<CustomInput
				type="password"
				label="비밀번호 확인"
				value={passwordCheck}
				setValue={setPasswordCheck}
				onChange={handleChange}
				className={RegisterPageCustomInputStyle}
			/>
			<ConfirmedIcon width={25} height={25} />
			<UnconfirmedIcon width={25} height={25} />
		</div>
	);
};

export default RegisterFormPagePasswordCheckInput;
