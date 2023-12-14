import { TextField, Button, Container, Box, Typography } from '@mui/material';
import Message from './Message';
import LockAvater from '@/component/2fa/sign/lcokAvater';
import { useState } from 'react';
import styles from '@/style/2fa/sign/index.module.css';

const TwoFactorBody = () => {
	const [value, setValue] = useState('5');
	return (
		<Container maxWidth="xs">
			<Box className={styles.boxContainer}>
				<LockAvater />
				<Message />
				<Box className={styles.timerContainer}>
					<Typography variant="h5" component="h3">
						{value}
					</Typography>
				</Box>
				<TextField
					id="outlined-basic"
					label="인증번호입력"
					variant="outlined"
					sx={{ mb: 2 }}
					fullWidth
				/>
				<Button variant="contained" fullWidth>
					인증
				</Button>
			</Box>
		</Container>
	);
};

export default TwoFactorBody;
