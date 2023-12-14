import { Box, Avatar, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import styles from '@/style/2fa/index.module.css';

const LockAvater = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
			<Avatar className={styles.avatarContainer}>
				<Box display={'flex'} flexDirection={'column'}>
					<LockIcon />
				</Box>
			</Avatar>
			<Typography variant="h4" component="h3" fontWeight="bold" marginBottom={0}>
				2차 인증
			</Typography>
		</Box>
	);
};

export default LockAvater;
