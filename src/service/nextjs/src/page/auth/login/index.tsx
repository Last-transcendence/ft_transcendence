import React, { useState, FormEvent, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import CustomInput from '../../../component/input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavigateFunction, Link, useSearchParams } from 'react-router-dom';
import { AuthContext, User } from 'context/AuthContext';
import {
	LoginPageCustomInputStyle,
	LoginPageFooterStyle,
	LoginPageFormStyle,
	LoginPageGoogleLoginStyle,
	LoginPageStyle,
} from './index.style';
import { GoogleLoginButton } from 'component/google-login-button';
import UnregisteredPage from './fail/unregistered';
import { setCookie } from 'component/cookie';
import { DivideLineIcon } from './icon';
import axios from 'axios';

const handleLogin = async (
	event: FormEvent,
	id: string | undefined,
	password: string | undefined,
	setMe: Dispatch<SetStateAction<User | null>>,
	navigate: NavigateFunction,
) => {
	try {
		event.preventDefault();

		if (!id || !password || id.length < 4 || password.length < 6) {
			throw new Error('입력하신 정보가 올바르지 않습니다.');
		}

		await axios
			.patch(
				`${process.env.REACT_APP_NESTJS_URL}/auth/login`,
				{
					id,
					password,
				},
				{ withCredentials: true },
			)
			.then(response => {
				setMe(response.data);
				setCookie('userId', response.data._id, { path: '/' });
				navigate('/main/info');
				toast.success('로그인 완료');
			})
			.catch(error => {
				console.error(error);
				alert(error.response.data.message);
			});
	} catch (err) {
		console.error(err);
		toast.error('로그인 중 오류가 발생했습니다.');
	}
};

const LoginForm = (props: {
	setMe: Dispatch<SetStateAction<User | null>>;
	navigate: NavigateFunction;
}) => {
	const { setMe, navigate } = props;
	const [id, setId] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);

	return (
		<form
			className={LoginPageFormStyle}
			onSubmit={event => handleLogin(event, id, password, setMe, navigate)}
		>
			<div>
				<CustomInput
					type="text"
					label="ID"
					value={id}
					setValue={setId}
					className={LoginPageCustomInputStyle}
				/>
				<CustomInput
					type="password"
					label="비밀번호"
					value={password}
					setValue={setPassword}
					className={LoginPageCustomInputStyle}
				/>
			</div>
			<button type="submit">로그인</button>
		</form>
	);
};

const GoogleLogin = (props: {
	setMe: Dispatch<SetStateAction<User | null>>;
	navigate: NavigateFunction;
}) => {
	const { setMe, navigate } = props;
	const [, setName] = useState<string | undefined>(undefined);
	const [, setHd] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (email) {
			axios
				.patch(
					`${process.env.REACT_APP_NESTJS_URL}/auth/login?social=google`,
					{
						email,
					},
					{ withCredentials: true },
				)
				.then(response => {
					setMe(response.data);
					setCookie('userId', response.data._id, { path: '/' });
					navigate('/main/info');
				})
				.catch(error => {
					console.error(error);
					navigate('/auth/login?fail=unregistered');
				});
		}
	}, [email]);

	return (
		<div className={LoginPageGoogleLoginStyle}>
			<GoogleLoginButton
				text={undefined}
				width={'300px'}
				height={'50px'}
				setName={setName}
				setHd={setHd}
				setEmail={setEmail}
			/>
		</div>
	);
};

const Footer = () => {
	return (
		<div className={LoginPageFooterStyle}>
			<span>아직 우리동방에 가입하지 않으셨나요?</span>
			<Link to={'/auth/register'}>
				<span>가입하기</span>
			</Link>
		</div>
	);
};

const LoginPage = () => {
	const [searchParams] = useSearchParams();
	const { setMe } = useContext(AuthContext);
	const navigate = useNavigate();

	if (searchParams.get('fail') === 'unregistered') {
		return <UnregisteredPage />;
	}

	return (
		<div className={LoginPageStyle}>
			<div>
				<span>로그인</span>
				<LoginForm setMe={setMe} navigate={navigate} />
				<div>
					<DivideLineIcon width={170} height={2} />
					<span>또는</span>
					<DivideLineIcon width={170} height={2} />
				</div>
				<GoogleLogin setMe={setMe} navigate={navigate} />
				<Footer />
			</div>
		</div>
	);
};

export default LoginPage;
