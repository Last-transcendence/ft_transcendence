import { Box, Container, Typography } from '@mui/material';
import CustomButton from './customButton';
import styles from '@/style/auth/login/index.module.css';
import Link from 'next/link';

const LoginBody = () => {
	return (
		<Container maxWidth="xs">
			<Box className={styles.boxContainer}>
				<Typography className={styles.typographyStyle} variant="h4" component="h2">
					ft_transcendence
				</Typography>
				<Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/ft`} id={styles.loginButton}>
					<CustomButton fullWidth size="large">
						42로 로그인
					</CustomButton>
				</Link>
			</Box>
		</Container>
	);
};

export default LoginBody;
