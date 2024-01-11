import React from 'react';
import { Box, Avatar } from '@mui/material';
import MyImage, { myImageProps, avatarImgStyle } from './myImage';

export interface avatarStyle {
	width?: number;
	height?: number;
	backgroundColor?: string;
}

export interface newAvatarProps extends myImageProps, avatarImgStyle {
	onClick?: () => void;
	sxStyle?: avatarStyle;
}

const NewAvatar = ({ sxStyle, avatarImgStyle, onClick, ...userImageData }: newAvatarProps) => (
	<Box>
		<Avatar sx={sxStyle} onClick={onClick}>
			<MyImage avatarImgStyle={avatarImgStyle} {...userImageData} />
		</Avatar>
	</Box>
);

export default NewAvatar;
