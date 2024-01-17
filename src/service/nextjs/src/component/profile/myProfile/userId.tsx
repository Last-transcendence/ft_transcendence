import { Typography, Box } from '@mui/material';

const UserId = ({ userName }: { userName: string | undefined }) => (
	<Box display="flex" flexDirection="column" alignItems="center">
		<Typography variant="h3">{userName}</Typography>
	</Box>
);

export default UserId;
