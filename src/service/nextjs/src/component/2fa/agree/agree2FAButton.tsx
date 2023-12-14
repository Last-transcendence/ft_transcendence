import { Box, Button } from '@mui/material';

const Agree2FAButton = () => {
	return (
		<Box style={{ display: 'flex', flexWrap: 'wrap' }}>
			<Button variant="contained" fullWidth sx={{ borderRadius: 0 }}>
				예
			</Button>
			<Button variant="contained" color="inherit" fullWidth sx={{ borderRadius: 0 }}>
				아니요
			</Button>
		</Box>
	);
};

export default Agree2FAButton;
