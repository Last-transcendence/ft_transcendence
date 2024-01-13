// import { useRouter } from "next/router";
import { Box, Container, Typography } from '@mui/material';
import CustomButton from './customButton';
import styles from '@/style/auth/login/index.module.css';
import { axiosInstance } from '@/service/api';

const handleLogin = () => {
	axiosInstance.get('/auth/ft').catch(err => {
		console.log(err);
	});
};

const LoginBody = () => {
	// 아직 oauth 시 어떻게 할지 안정했음.
	// const router = useRouter();

	// const handleLogin = () => {
	//   const clientID = process.env.NEXT_PUBLIC_42INTRA_CLIENT_ID;
	//   const redirectURI = process.env.NEXT_PUBLIC_42INTRA_REDIRECT_URL;
	//   const scope = "";
	//   const state = "";
	//   const responseType = "code";

	//   window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&state=${state}&response_type=${responseType}`;
	// };

	return (
		<Container maxWidth="xs">
			<Box className={styles.boxContainer}>
				<Typography className={styles.typographyStyle} variant="h4" component="h2">
					ft_transcendence
				</Typography>
				{/* <CustomButton onClick={handleLogin} fullWidth size="large"> */}
				<a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/ft`}>42로 로그인</a>
				<CustomButton fullWidth size="large" onClick={handleLogin}>
					42로 로그인
				</CustomButton>
			</Box>
		</Container>
	);
};

export default LoginBody;
