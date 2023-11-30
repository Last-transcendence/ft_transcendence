import React from 'react';
import { RegisteredPageStyle } from './registered.style';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const handleLogin = (navigate: NavigateFunction) => {
	navigate('/auth/login');
};

const RegisteredPage = () => {
	const navigate = useNavigate();

	return (
		<div className={RegisteredPageStyle}>
			<div>
				<span>이미 가입된 이메일입니다.</span>
				<span onClick={() => handleLogin(navigate)}>로그인 하기</span>
			</div>
		</div>
	);
};

export default RegisteredPage;
