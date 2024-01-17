import { Typography, Box, Input } from '@mui/material';

const MyProfileMenu = () => {
	const onClick = () => {};
	return (
		<Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={3}>
			<Typography variant="h6">내 정보</Typography>
			<Typography variant="body2" color="orange" onClick={onClick} style={{ cursor: 'pointer' }}>
				로그아웃
			</Typography>
		</Box>
	);
};

export default MyProfileMenu;
