import { Button, TextField, Typography, Box } from '@mui/material';
import styles from '@/style/auth/2fa/setting/index.module.css';
const Certification = () => {
	return (
		<Box style={{ marginTop: '2em' }}>
			<Typography className={styles.PContainer} marginBottom={1}>
				인증코드를 입력해주세요
			</Typography>
			<TextField fullWidth size="small" />
			<Button variant="contained" fullWidth sx={{ marginTop: '0.6em' }}>
				인증
			</Button>
		</Box>
	);
};

export default Certification;
