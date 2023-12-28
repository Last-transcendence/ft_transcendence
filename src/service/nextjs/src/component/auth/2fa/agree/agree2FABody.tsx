import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Box, Typography } from '@mui/material';
import styles from '@/style/auth/2fa/agree/index.module.css';

const Agree2FABody = () => {
	return (
		<Box className={styles.boxContainer}>
			<DoneOutlineIcon className={styles.doneIcon} />
			<Typography>회원가입이 완료되었습니다</Typography>
			<Typography>2차 인증을 설정하시겠습니까?</Typography>
		</Box>
	);
};

export default Agree2FABody;
