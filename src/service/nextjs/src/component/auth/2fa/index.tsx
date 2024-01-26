import styles from '@/style/auth/2fa/sign/index.module.css';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import Message from './Message';
import LockAvater from '@/component/auth/2fa/lcokAvater';
import { useState } from 'react';
import { getFetcher, postFetcher } from '@/service/api';
import CustomSnackbar from '@/component/common/CustomSnackbar';
import { useRouter } from 'next/navigation';

const TwoFactorBody = () => {
	const router = useRouter();
	const [time, setTime] = useState<number | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassward] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [snackErrorMessage, setSnackErrorMessage] = useState<string>('');
	const [intervalId, setIntervalId] = useState<string | number | NodeJS.Timeout | undefined>(
		undefined,
	);

	const sendTimeRequestButton = async () => {
		try {
			if (setIntervalId !== undefined) {
				clearInterval(intervalId);
			}
			const response = await getFetcher('/auth/2fa');
			setTime(300);
			setIntervalId(
				setInterval(() => {
					setTime(prevTime => {
						if (prevTime !== undefined) {
							if (prevTime > 0) {
								return prevTime - 1;
							} else {
								clearInterval(intervalId);
								return 0;
							}
						}
					});
				}, 1000),
			);
		} catch (error: any) {
			setSnackErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const twoFAApprovRequestButton = () => {
		setLoading(true);
		if (password.length !== 6) {
			setErrorMessage('*인증 코드는 6자를 다 채워주세요.');
			setLoading(false);
		} else {
			dataSendToServer();
		}
	};

	const dataSendToServer = async () => {
		try {
			if (time === undefined) {
				throw new Error('이메일 인증을 요청해주세요.');
			} else if (time <= 0) {
				throw new Error('인증 응답 시간이 초과되었습니다');
			}
			await postFetcher('/auth/2fa', { twoFaCode: password });
			router.push('/auth/login/callback');
		} catch (error: any) {
			setSnackErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = event.target.value.replace(/[^0-9]/g, '');
		setPassward(numericValue);
	};

	const handleSnackbarClose = () => {
		setErrorMessage('');
		setSnackErrorMessage('');
	};

	return (
		<Container maxWidth="xs">
			<Box className={styles.boxContainer}>
				<CustomSnackbar
					open={snackErrorMessage === '' ? false : true}
					onClose={handleSnackbarClose}
					success={false}
				>
					{snackErrorMessage}
				</CustomSnackbar>
				<LockAvater />
				<Message />
				<Box sx={{ marginLeft: 'auto' }} marginTop="4%" marginBottom={1}>
					<Button variant="contained" onClick={sendTimeRequestButton} disabled={loading}>
						{time === undefined ? '전송' : '재전송'}
					</Button>
				</Box>
				<Box className={styles.timerContainer}>
					<Typography variant="h5" component="h3">
						{time === undefined
							? undefined
							: time > 0
								? `${String(Math.trunc(time / 60)).padStart(2, '0')}분 ${String(
										Math.trunc(time % 60),
									).padStart(2, '0')}초`
								: '시간 초과'}
					</Typography>
				</Box>
				<TextField
					id="outlined-basic"
					label="인증번호입력"
					variant="outlined"
					fullWidth
					inputProps={{ maxLength: 6 }}
					value={password}
					required
					onChange={handleInputChange}
				/>
				<div style={{ width: '100%', marginBottom: '10px' }}>
					{errorMessage === '' ? undefined : (
						<Typography variant={'body1'} color={'red'} marginBottom={2}>
							{errorMessage}
						</Typography>
					)}
				</div>
				<Button variant="contained" fullWidth onClick={twoFAApprovRequestButton}>
					인증
				</Button>
			</Box>
		</Container>
	);
};

export default TwoFactorBody;
