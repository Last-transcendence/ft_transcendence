import NewAvatar, { newAvatarProps } from './newAvatar';
import { Box, Typography } from '@mui/material';

export interface NewIconProps extends newAvatarProps {
	message?: string;
}

const NewIcon = ({ message, ...newAvatar }: NewIconProps) => (
	<Box display="flex" flexDirection="column" alignItems="center" marginTop="10%">
		<NewAvatar {...newAvatar} />
		{message && <Typography>{message}</Typography>}
	</Box>
);

export default NewIcon;
