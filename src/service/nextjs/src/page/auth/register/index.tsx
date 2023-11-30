import React, { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
	RegisterPageStyle,
	GoogleRegisterStyle,
	RegisterPageHeaderStyle,
	RegisterPageFooterStyle,
} from './index.style';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLoginButton } from 'component/google-login-button';
import axios from 'axios';
import RegisteredPage from './fail/registered';
import { RegisterContext } from 'context/RegisterContext';

const Header = () => {
	return (
		<div className={RegisterPageHeaderStyle}>
			<span>회원가입</span>
		</div>
	);
};

const Footer = () => {
	return (
		<div className={RegisterPageFooterStyle}>
			<span>이미 회원이시라면</span>
			<Link to={'/auth/login'}>
				<span>로그인 하기</span>
			</Link>
		</div>
	);
};

const RegisterPage = () => {
	const [searchParams] = useSearchParams();
	const [name, setName] = useState<string | undefined>(undefined);
	const [, setHd] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const { setRegisterInfo } = useContext(RegisterContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (email) {
			axios
				.post(`${process.env.REACT_APP_NESTJS_URL}/user`, { email })
				.then(() => {
					setRegisterInfo(null);
					navigate('/auth/register?fail=registered');
				})
				.catch(() => {
					setRegisterInfo({ name, email });
					navigate('/auth/register/form');
				});
		}
	}, [email]);

	if (searchParams.get('fail') === 'registered') {
		return <RegisteredPage />;
	}

	return (
		<div className={RegisterPageStyle}>
			<div>
				<Header />
				<div className={GoogleRegisterStyle}>
					<GoogleLoginButton
						text="Google 계정으로 가입하기"
						width="270px"
						height="50px"
						setName={setName}
						setHd={setHd}
						setEmail={setEmail}
					/>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default RegisterPage;
