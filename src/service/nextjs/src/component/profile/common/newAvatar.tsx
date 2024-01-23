import React, { useEffect, useState } from 'react';
import { Box, Avatar } from '@mui/material';
import MyImage, { myImageProps } from './myImage';
import CustomImage from '@/component/common/CustomImage';

export interface avatarStyle {
	backgroundColor?: string;
	isHover?: boolean;
}

export interface newAvatarProps extends myImageProps {
	onClick?: () => void;
	sxStyle?: avatarStyle;
}

const list = ['/Mail.png', '/Add User Male.png', '/Ping Pong.png'];

const NewAvatar = ({ sxStyle, onClick, ...userImageData }: newAvatarProps) => {
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
				{list.includes(userImageData.image as string) ? (
					<CustomImage
						img={userImageData.image as string}
						alt={userImageData.name as string}
					/>
				) : (
					<MyImage
						image={userImageData.image || ''}
						name={userImageData.name}
					/>
				)}
			</Avatar>
		</Box>
	);
};

export default NewAvatar;
