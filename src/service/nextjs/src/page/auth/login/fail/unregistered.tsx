import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UnRegisteredPageStyle } from './unregistered.style';

const handleRegister = (navigate: NavigateFunction) => {
	navigate('/auth/register');
};

const UnregisteredPage = () => {
	const navigate = useNavigate();

	return (
		<div className={UnRegisteredPageStyle}>
			<div>
				<span>가입되지 않은 이메일입니다.</span>
				<span onClick={() => handleRegister(navigate)}>가입하기</span>
			</div>
		</div>
	);
};

export default UnregisteredPage;
