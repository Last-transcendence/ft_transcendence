import { Box, Container, Typography } from '@mui/material';
import CustomButton from './customButton';
import styles from '@/style/auth/login/index.module.css';
import { useState } from 'react';
import CustomSnackbar from '@/component/common/customSnackbar';

const LoginBody = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleLogin = async () => {
		// try {
		// setLoading(true);
		window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/ft`;
		// const response = await getFetcher('auth/ft');
		// console.log(response);
		// 		if (response) {
		// 			return router.push('/');
		// } else {
		// 	router.push('/auth/creatUser');
		// 	// }
		// } catch (error: any) {
		// 	console.log(error);
		// 	const message: string = error.message;
		// 	setErrorMessage(message);
		// }
	};

	const handleSnackbarClose = () => {
		setErrorMessage('');
		setLoading(false);
	};

	return (
		<Container maxWidth="xs">
			<CustomSnackbar
				open={errorMessage.length !== 0 ? true : false}
				onClose={handleSnackbarClose}
				success={false}
			>
				로그인 error : {errorMessage}
			</CustomSnackbar>
			<Box className={styles.boxContainer}>
				<Typography className={styles.typographyStyle} variant="h4" component="h2">
					ft_transcendence
				</Typography>
				<CustomButton onClick={handleLogin} fullWidth size="large" disabled={loading}>
					42로 로그인
				</CustomButton>
			</Box>
		</Container>
	);
};

export default LoginBody;
