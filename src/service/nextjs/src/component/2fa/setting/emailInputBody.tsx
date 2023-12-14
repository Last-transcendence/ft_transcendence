import { Button, TextField, Box, Typography } from '@mui/material';
import styles from '@/style/2fa/setting/index.module.css';
const EmailInputBody = () => {
	return (
		<Box>
			<Typography className={styles.PContainer} marginBottom={1}>
				인증에 사용할 이메일 입력해주세요
			</Typography>
			<Box marginBottom={1} style={{ display: 'flex' }}>
				<TextField size="small" />
				<Typography marginLeft={1} marginRight={1} marginTop={1}>
					@
				</Typography>
				<TextField size="small" />
			</Box>
			<Button variant="contained" fullWidth>
				인증코드 발송
			</Button>
		</Box>
	);
};

export default EmailInputBody;
