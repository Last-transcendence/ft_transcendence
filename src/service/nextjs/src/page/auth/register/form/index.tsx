import React, { Dispatch, SetStateAction, useEffect, FormEvent, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext, User } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	FormRegisterPageStyle,
	RegisterFormStyle,
	RegisterPageCustomInputStyle,
} from './index.style';
import CustomInput from 'component/input';
import { RegisterContext, RegisterInfo } from 'context/RegisterContext';
import RegisterFormPagePasswordInput from './password';
import RegisterFormPageIdInput from './id';
import RegisterFormPagePasswordCheckInput from './password-check';
import DoneFormRegisterPage from './done';

const registerHandler = async (
	event: FormEvent,
	name: string | undefined,
	id: string | undefined,
	isDuplicatedId: boolean,
	password: string | undefined,
	passwordCheck: string | undefined,
	email: string | undefined,
	setMe: Dispatch<SetStateAction<User | null>>,
	setIsRegistered: Dispatch<SetStateAction<boolean>>,
) => {
	try {
		event.preventDefault();

		if (!name || !id || !password || !passwordCheck) {
			alert('모든 항목을 입력해주세요');
			return;
		}
		if (isDuplicatedId) {
			alert('다른 아이디로 가입해주세요');
			return;
		}
		if (password.length < 8) {
			alert('비밀번호를 8자 이상으로 설정해주세요');
			return;
		}
		if (password !== passwordCheck) {
			alert('비밀번호 확인이 일치하지 않습니다');
			return;
		}

		await axios
			.post(
				`${process.env.REACT_APP_NESTJS_URL}/auth/register`,
				{
					name,
					id,
					password,
					email,
				},
				{ withCredentials: true },
			)
			.then(response => {
				setMe(response.data);
				setIsRegistered(true);
			})
			.catch(error => {
				console.error(error);
				alert(error.response.data.message);
			});
	} catch (err: unknown) {
		if (err instanceof Error) {
			toast.error(err.message);
		}
	}
};

const RegisterForm = (props: {
	registerInfo: RegisterInfo;
	setIsRegistered: Dispatch<SetStateAction<boolean>>;
}) => {
	const { registerInfo, setIsRegistered } = props;
	const email = registerInfo.email;
	const [name, setName] = useState<string | undefined>(registerInfo.name);
	const [id, setId] = useState<string | undefined>('');
	const [isDuplicatedId, setIsDuplicatedId] = useState<boolean>(false);
	const [password, setPassword] = useState<string | undefined>('');
	const [passwordCheck, setPasswordCheck] = useState<string | undefined>('');
	const { setMe } = useContext(AuthContext);

	return (
		<form
			className={RegisterFormStyle}
			onSubmit={event =>
				registerHandler(
					event,
					name,
					id,
					isDuplicatedId,
					password,
					passwordCheck,
					email,
					setMe,
					setIsRegistered,
				)
			}
		>
			<div>
				<CustomInput
					type="text"
					label="이름"
					value={name}
					setValue={setName}
					className={RegisterPageCustomInputStyle}
				/>
				<RegisterFormPageIdInput id={id} setId={setId} setIsDuplicatedId={setIsDuplicatedId} />
				<RegisterFormPagePasswordInput password={password} setPassword={setPassword} />
				<RegisterFormPagePasswordCheckInput
					password={password}
					passwordCheck={passwordCheck}
					setPasswordCheck={setPasswordCheck}
				/>
				<div>
					<span>{email}</span>
				</div>
				<button className="font-change" type="submit">
					회원가입
				</button>
			</div>
		</form>
	);
};

const FormRegisterPage = () => {
	const { registerInfo } = useContext(RegisterContext);
	const navigate = useNavigate();
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [isRegistered, setIsRegistered] = useState<boolean>(false);

	useEffect(() => {
		if (!registerInfo) {
			if (!timer) {
				const timeoutId = setTimeout(() => {
					navigate('/auth/register');
				}, 10);
				setTimer(timeoutId);
			}
		} else {
			if (timer) {
				clearTimeout(timer);
			}
		}
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [registerInfo, navigate, timer]);

	return (
		<div className={FormRegisterPageStyle}>
			{isRegistered ? (
				<DoneFormRegisterPage />
			) : registerInfo ? (
				<div>
					<span>회원가입</span>
					<RegisterForm registerInfo={registerInfo} setIsRegistered={setIsRegistered} />
				</div>
			) : null}
		</div>
	);
};

export default FormRegisterPage;
