import styles from '@/style/creatUser/index.module.css';
import { TextField, Container, Box, Typography } from '@mui/material';
import UserPhoto from '@/component/creatUser/userPhoto';
import CustomButton from '@/component/creatUser/newButton';

const CreatUserBody = () => {
	return (
		<Container maxWidth="xs">
			<Box className={styles.boxStyle}>
				<UserPhoto />
				<Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
					닉네임
				</Typography>
				<TextField
					id="outlined-basic"
					label="nickname"
					variant="outlined"
					fullWidth
					required
					InputProps={{ inputProps: { maxLength: 15 } }}
				/>
				<CustomButton fullWidth variant="contained" sx={{ mt: 1 }}>
					완료
				</CustomButton>
			</Box>
		</Container>
	);
};

export default CreatUserBody;
