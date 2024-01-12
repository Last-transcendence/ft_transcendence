import React from 'react';
import { Box, Avatar } from '@mui/material';
import MyImage, { myImageProps, avatarImgStyle } from './myImage';

export interface avatarStyle {
	width?: number;
	height?: number;
	backgroundColor?: string;
	position?: 'relative';
}

export interface newAvatarProps extends myImageProps, avatarImgStyle {
	onClick?: () => void;
	sxStyle?: avatarStyle;
}

const NewAvatar = ({ sxStyle, avatarImgStyle, onClick, ...userImageData }: newAvatarProps) => (
	<Box>
		<Avatar sx={{
    ...(sxStyle?.position === undefined
      ? {}
      : {
          ':hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            border: '2px solid black',
          },
        }),
    ...sxStyle,
  }}
 onClick={onClick}>
			<MyImage avatarImgStyle={avatarImgStyle} {...userImageData} />
		</Avatar>
	</Box>
);

export default NewAvatar;
