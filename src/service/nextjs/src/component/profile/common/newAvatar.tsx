import React from 'react';
import { Box, Avatar } from '@mui/material';
import MyImage, { myImageProps, avatarImgStyle } from './myImage';

export interface avatarStyle {
	width?: number;
	height?: number;
	backgroundColor?: string;
}

export interface newAvatarProps extends myImageProps, avatarImgStyle {
	sxStyle?: avatarStyle;
}

const NewAvatar = ({ sxStyle, avatarImgStyle, ...userImageData }: newAvatarProps) => (
	<Box>
		<Avatar sx={sxStyle}>
			<MyImage avatarImgStyle={avatarImgStyle} {...userImageData} />
		</Avatar>
	</Box>
);

export default NewAvatar;
