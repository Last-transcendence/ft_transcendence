// components/NewIcon.tsx
import React from 'react';
import NewAvatar, { NewAvatarProps } from './newAvatar';
import { Box, Typography } from '@mui/material';

export interface NewIconProps extends NewAvatarProps {
	message?: string;
}

const NewIcon = ({ image, altText, sxStyle, imageStyle, message }: NewIconProps) => (
	<Box display="flex" flexDirection="column" alignItems="center" marginTop="10%">
		<NewAvatar image={image} altText={altText} sxStyle={sxStyle} imageStyle={imageStyle} />
		{message && <Typography>{message}</Typography>}
	</Box>
);

export default NewIcon;
