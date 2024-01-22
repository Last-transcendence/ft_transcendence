import React, { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material';
import MyImage, { myImageProps, avatarImgStyle } from './myImage';

export interface avatarStyle {
	width?: number;
	height?: number;
	backgroundColor?: string;
	isHover?: boolean;
}

export interface newAvatarProps extends myImageProps, avatarImgStyle {
	onClick?: () => void;
	sxStyle?: avatarStyle;
}

const NewAvatar = ({ sxStyle, avatarImgStyle, onClick, ...userImageData }: newAvatarProps) => {
	const [hover, setHover] = useState<boolean>(false);
	const newSxStyle = Object.assign({}, sxStyle);
	useEffect(() => {
		if (newSxStyle !== undefined && newSxStyle.isHover === true) {
			setHover(true);
		}
		delete newSxStyle.isHover;
	}, [newSxStyle]);

	return (
		<Box>
			<Avatar
				sx={{
					...(hover === true
						? {
								':hover': {
									cursor: 'pointer',
									transform: 'scale(1.05)',
									border: '2px solid black',
								},
							}
						: {}),
					...newSxStyle,
				}}
				onClick={onClick}
			>
				<MyImage
					avatarImgStyle={avatarImgStyle}
					image={userImageData.image || ''}
					name={userImageData.name}
				/>
			</Avatar>
		</Box>
	);
};

export default NewAvatar;
