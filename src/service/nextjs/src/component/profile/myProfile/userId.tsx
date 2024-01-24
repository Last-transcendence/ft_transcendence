import { Typography, Box } from '@mui/material';

const UserId = ({ userName }: { userName: string | undefined }) => (
	<Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
		<Typography variant="h4">{userName}</Typography>
	</Box>
);

export default UserId;
