import styles from '@/style/auth/creatUser/index.module.css';
import { Container, Box, Stack } from '@mui/material';
import UserPhoto from './userPhoto';
import { ChangeEvent, useState, useEffect } from 'react';
import Modify2FA, { ModifyTwoFactorProps } from '@/component/common/modify2FA';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import CustomSnackbar from '@/component/common/customSnackbar';
import CustomTextField, { customTextFieldProps } from '@/component/common/customInputField';
import { useCallback } from 'react';
import { getFetcher, postFetcher } from '@/service/api';

interface EditProfileProps {
	isModify: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	execSendServer: boolean;
	setExecSendServer: Dispatch<SetStateAction<boolean>>;
}

interface User {
	nickname: string;
	email2fa: string;
	use2fa: boolean;
	profileImageURI: string | ArrayBuffer | null;
}

interface tempUser {
	nickname: string;
	use2fa: boolean;
}

const CreatOrModifyBody = ({
	isModify,
	setLoading,
	execSendServer,
	setExecSendServer,
}: EditProfileProps) => {
	const [imgFile, setImgFile] = useState<File | undefined>(undefined);
	const [img, setImg] = useState<string | ArrayBuffer | null>(null);
	const [userName, setUserName] = useState<string>('');
	const [twoFATrueFalse, setTwoFATrueFalse] = useState<boolean>(false);
	const [towFactorEmail, setTwoFactorEmail] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const router = useRouter();

	const path = isModify ? '/user/em' : '/auth/register';

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getFetcher<User>('/user/me');

				setUserName(userData.nickname);
				setTwoFATrueFalse(userData.use2fa);
				setTwoFactorEmail(userData.email2fa);
				setImg(userData.profileImageURI);
			} catch (error) {
				console.log('사용자 정보를 불러오는 중 오류 발생');
			}
		};

		if (isModify) {
			fetchData();
		}
	}, [isModify]);

	const sendToServer = useCallback(async () => {
		const formData = new FormData();
		const user: tempUser = {
			nickname: userName,
			use2fa: twoFATrueFalse,
			// email2fa: twoFATrueFalse ? towFactorEmail : '',
		};
		// if (imgFile) {
		// 	formData.append('profileImageURI', imgFile);
		// }
		// formData.append('User', JSON.stringify(user));
		// formData.append('nickname', userName);
		// formData.append('use2fa', twoFATrueFalse);
		// if (twoFATrueFalse) {
		// 	formData.append('email2fa', towFactorEmail);
		// }
		// for (let key of formData.keys()) {
		// 	console.log(key, ':', formData.get(key));
		// }
		try {
			// const response = await postFetcher(path, formData, {
			// 	headers: { 'Content-Type': 'multipart/form-data' },
			// });
			const response = await postFetcher(path, user);
			router.push('/');
		} catch (error) {
			console.log('에러발생');
			router.push('/auth/2fa/sign');
		} finally {
			setLoading(false);
		}
		// }, [imgFile, userName, twoFATrueFalse, path, towFactorEmail, router, setLoading]);
	}, [userName, twoFATrueFalse, path, router, setLoading]);

	const userNameChecker = useCallback(() => {
		try {
			if (userName.length < 3) throw new Error('닉네임이 너무 짧습니다.');
			if (userName.length > 10) throw new Error('닉네임이 너무 깁니다.');
			if (/[!@#$%^&*(),.?":{}|<>]/.test(userName))
				throw new Error('닉네임에 특수 문자를 넣지 마세요.');
		} finally {
		}
	}, [userName]);

	const towFactorEmailCheker = useCallback(() => {
		try {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]$/.test(towFactorEmail))
				throw new Error('올바른 email 형식이 아닙니다');
		} finally {
		}
	}, [towFactorEmail]);

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
				setErrorMessage(error.message);
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
				console.log('파일 읽는 도중 문제 발생');
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
			setTwoFactorEmail(towFactorEmail);
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
		email: towFactorEmail,
		onEmailChange: setTwoFactorEmail,
	};

	const handleModarClose = () => {
		setErrorMessage('');
	};

	return (
		<Stack justifyContent={'space-between'} height="70%">
			<Container maxWidth="xs">
				<CustomSnackbar
					open={errorMessage !== '' ? true : false}
					onClose={handleModarClose}
					success={false}
				>
					{errorMessage}
				</CustomSnackbar>
				<Box className={styles.boxStyle}>
					<UserPhoto onClick={onClick} onChangePicture={handleChangePicture} imgUrl={img} />
					<Box width="90%" display="flex" flexDirection="column" justifyItems="flex-start">
						<CustomTextField {...CustomTextFieldValues} />
						<Modify2FA {...Mdify2FaValue} />
					</Box>
				</Box>
			</Container>
		</Stack>
	);
};

export default CreatOrModifyBody;
