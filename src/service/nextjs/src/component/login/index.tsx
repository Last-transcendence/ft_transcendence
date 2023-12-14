// import { useRouter } from "next/router";
import { Box, Container, Typography } from '@mui/material';
import CustomButton from './customButton';
import styles from '@/style/login/index.module.css';

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
				<CustomButton fullWidth size="large">
					42로 로그인
				</CustomButton>
			</Box>
		</Container>
	);
};

export default LoginBody;
