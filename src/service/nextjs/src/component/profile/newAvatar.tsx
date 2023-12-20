// components/NewAvatar.tsx
import React from 'react';
import { Box, Avatar } from '@mui/material';
import Image from 'next/image';

export interface NewAvatarProps {
	image: string;
	altText: string;
	sxStyle: object;
	imageStyle: object;
}

const NewAvatar = ({ image, altText, sxStyle, imageStyle }: NewAvatarProps) => (
	<Box>
		<Avatar sx={sxStyle}>
			<Image src={image} alt={altText} width={50} height={50} style={imageStyle} />
		</Avatar>
	</Box>
);

export default NewAvatar;
