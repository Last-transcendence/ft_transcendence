import styles from '@/style/auth/creatUser/index.module.css';
import { TextField, Container, Box, Typography } from '@mui/material';
import UserPhoto from '@/component/auth/creatUser/userPhoto';
import CustomButton from '@/component/auth/creatUser/newButton';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { postFetcher } from '@/service/api';

const CreatUserBody = () => {
	const [nickname, setNickname] = useState('');
	const router = useRouter();

	const createUser = async () => {
		try {
			const res = await postFetcher('/auth/register', {
				nickname,
				use2fa: false,
			});
			console.log('res', res);
			// await router.push('/');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Container maxWidth="xs">
			<Box className={styles.boxStyle}>
				<UserPhoto />
				<Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
					닉네임
				</Typography>
				<TextField
					value={nickname}
					id="outlined-basic"
					label="nickname"
					variant="outlined"
					fullWidth
					required
					InputProps={{ inputProps: { maxLength: 15 } }}
					onChange={e => {
						setNickname(e.target.value);
					}}
				/>
				<CustomButton fullWidth variant="contained" sx={{ mt: 1 }} onClick={createUser}>
					완료
				</CustomButton>
			</Box>
		</Container>
	);
};

export default CreatUserBody;
