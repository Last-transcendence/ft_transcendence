import { Typography, Box } from '@mui/material';

const MyProfileMenu = () => {
	return (
		<Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={3}>
			<Typography variant="h6">내 정보</Typography>
			<Typography variant="body2" color="orange">
				로그아웃
			</Typography>
		</Box>
	);
};

export default MyProfileMenu;
