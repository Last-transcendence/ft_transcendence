import styles from '@/style/auth/creatUser/index.module.css';
import { Container, Box, Stack } from '@mui/material';
import UserPhoto from './UserPhoto';
import { ChangeEvent, useState, useEffect, useContext } from 'react';
import Modify2FA, { ModifyTwoFactorProps } from '@/component/common/Modify2FA';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import CustomSnackbar from '@/component/common/CustomSnackbar';
import CustomTextField, { customTextFieldProps } from '@/component/common/CustomInputField';
import { useCallback } from 'react';
import { postFetcher, patchFetcher } from '@/service/api';
import AuthContext from '@/context/auth.context';
import Me from '@/type/me.type';
import { useSearchParams } from 'next/navigation';
import Loading from '../Loading';

interface EditProfileProps {
	isModify: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	execSendServer: boolean;
	setExecSendServer: Dispatch<SetStateAction<boolean>>;
}

const headers = {
	'Content-Type': 'multipart/form-data',
};

const CreatOrModifyBody = ({
	isModify,
	setLoading,
	execSendServer,
	setExecSendServer,
}: EditProfileProps) => {
	const { setMe, me } = useContext(AuthContext);
	const [imgFile, setImgFile] = useState<File | undefined>(undefined);
	const [img, setImg] = useState<string | ArrayBuffer | null>(null);
	const [userName, setUserName] = useState<string>('');
	const [twoFATrueFalse, setTwoFATrueFalse] = useState<boolean>(false);
	const [twoFactorEmail, setTwoFactorEmail] = useState<string>('');
	const [errorMessageNickName, setErrorMessageNickName] = useState<string>('');
	const [errorMessageEmail, setErrorMessageEmail] = useState<string>('');
	const [modarErrorMessage, setModarErrorMessage] = useState<string>('');
	const params = useSearchParams();
	const router = useRouter();

	const path = isModify ? '/user/me' : '/auth/register';

	useEffect(() => {
		const fetchData = () => {
			if (me !== null) {
				setUserName(me.nickname);
				setTwoFATrueFalse(me.use2fa);
				if (me.email2fa !== undefined && me.email2fa !== null) setTwoFactorEmail(me.email2fa);
				if (me.profileImageURI !== undefined) setImg(me.profileImageURI);
			}
		};

		const getNickname = () => {
			const nick = params.get('nickname');
			if (nick !== null) {
				setUserName(nick);
			}
		};

		if (isModify) {
			fetchData();
		}

		if (!isModify) {
			getNickname();
		}
	}, [isModify, me, params]);

	const sendToServer = useCallback(async () => {
		const formData = new FormData();
		if (imgFile) {
			formData.append('file', imgFile);
		}
		if (twoFATrueFalse) {
			formData.append('email2fa', twoFactorEmail);
		}
		formData.append('nickname', userName);
		formData.append('use2fa', `${twoFATrueFalse}`);
		try {
			const response = isModify
				? await patchFetcher<Me>(path, formData, { headers })
				: await postFetcher<Me>(path, formData, { headers });
			if (isModify === true) {
				setMe(response);
				router.push('/');
			} else {
				window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
			}
			// if (twoFATrueFalse == true) {
			// 	window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
			// } else {
			// 	router.push('/auth/login/callback');
			// }
		} catch (error: any) {
			setErrorMessageNickName('');
			setErrorMessageEmail('');
			// 값 확인
			console.log(error);
			if (!error?.response?.status) {
				setModarErrorMessage('서버에러입니다');
			}
			if (error.response.status === 401) {
				try {
					router.push('/auth/login');
				} catch (routerError) {
					setModarErrorMessage('라우터 이동 중 에러가 발생했습니다.');
				}
				// window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/ft`;
			} else if (error.response.status === 400) {
				setModarErrorMessage('이미 쓰고있는 닉네임입니다.');
			} else {
				setModarErrorMessage(error.message);
			}
		} finally {
			setLoading(false);
		}
	}, [
		userName,
		twoFATrueFalse,
		path,
		setLoading,
		isModify,
		imgFile,
		twoFactorEmail,
		router,
		setMe,
	]);

	const userNameChecker = useCallback(() => {
		try {
			if (userName.length < 3) throw new Error('닉네임이 너무 짧습니다.');
			if (userName.length > 10) throw new Error('닉네임이 너무 깁니다.');
			if (/[!@#$%^&*(),.?":{}|<>]/.test(userName))
				throw new Error('닉네임에 특수 문자를 넣지 마세요.');
		} catch (error: any) {
			setErrorMessageNickName(`*${error.message}`);
			throw new Error(error.message);
		} finally {
		}
	}, [userName]);

	const towFactorEmailCheker = useCallback(() => {
		try {
			if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(twoFactorEmail) === false)
				throw new Error('올바른 email 형식이 아닙니다');
		} catch (error: any) {
			setErrorMessageNickName('');
			setErrorMessageEmail(`*${error.message}`);
			throw new Error(error.message);
		} finally {
		}
	}, [twoFactorEmail]);

	const valueCheker = useCallback(() => {
		try {
			userNameChecker();
			if (twoFATrueFalse) {
				towFactorEmailCheker();
			}
		} finally {
		}
	}, [userNameChecker, towFactorEmailCheker, twoFATrueFalse]);

	useEffect(() => {
		if (execSendServer) {
			try {
				valueCheker();
				sendToServer();
			} catch (error: any) {
			} finally {
				setExecSendServer(false);
				setLoading(false);
			}
		}
	}, [execSendServer, valueCheker, sendToServer, setLoading, setExecSendServer]);

	const onClick = () => {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
		fileInput?.click();
	};

	const handleChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onerror = error => {
				setModarErrorMessage('파일 읽기에 실패했습니다');
			};

			reader.onloadend = () => {
				setImg(reader.result);
			};

			reader.readAsDataURL(file);
			setImgFile(file);
		}
	};

	const handleToggleTwoFactorState = () => {
		setTwoFATrueFalse(!twoFATrueFalse);
		if (!twoFATrueFalse) {
			setTwoFactorEmail(twoFactorEmail);
		}
	};

	const CustomTextFieldValues: customTextFieldProps = {
		label: '닉네임',
		value: userName,
		onChange: e => setUserName(e.target.value),
		typographyProps: {
			variant: 'h6',
			mt: 2,
			mb: 1,
			textAlign: 'left',
		},
	};

	const Mdify2FaValue: ModifyTwoFactorProps = {
		checked: twoFATrueFalse,
		onToggle: handleToggleTwoFactorState,
		email: twoFactorEmail,
		onEmailChange: setTwoFactorEmail,
	};

	const handleModarClose = () => {
		setModarErrorMessage('');
	};

	return isModify && !me ? (
		<Loading />
	) : (
		<Stack justifyContent={'space-between'} height="70%">
			<Container maxWidth="xs">
				<CustomSnackbar
					open={modarErrorMessage !== '' ? true : false}
					onClose={handleModarClose}
					success={false}
				>
					{modarErrorMessage}
				</CustomSnackbar>
				<Box className={styles.boxStyle}>
					<UserPhoto onClick={onClick} onChangePicture={handleChangePicture} imgUrl={img || ''} />
					<Box width="90%" display="flex" flexDirection="column" justifyItems="flex-start">
						<CustomTextField {...CustomTextFieldValues} />
						<div style={{ color: 'red' }}>{errorMessageNickName}</div>
						<Modify2FA {...Mdify2FaValue} />
						<div style={{ color: 'red' }}>{twoFATrueFalse ? errorMessageEmail : undefined}</div>
					</Box>
				</Box>
			</Container>
		</Stack>
	);
};

export default CreatOrModifyBody;
