import { Container, Typography, Box } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import EmailInputBody from './emailInputBody';
import Certification from './checkCertification';
import styles from '@/style/auth/2fa/setting/index.module.css';

const Setting = () => {
	return (
		<Container maxWidth="xs">
			<Box marginTop={3} marginBottom={3} className={styles.boxContainer}>
				<HttpsIcon style={{ width: '2em', height: '2em' }} />
				<Typography marginTop={0.5} marginLeft={1} style={{ fontSize: '2em', fontWeight: 'bold' }}>
					2차 인증
				</Typography>
			</Box>
			<EmailInputBody />
			<Certification />
		</Container>
	);
};

export default Setting;
