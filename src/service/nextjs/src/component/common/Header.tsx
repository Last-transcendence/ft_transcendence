import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HambergurMenu from '@/component/common/hambergur-menu';
import FriendPage from '@/component/friend';
import React, { ReactNode, useState } from 'react';

export const Header = () => {
	return (
		<Box bgcolor={'skyblue'} width={'100%'} height={'70px'}>
			헤더
		</Box>
	);
};

export const MenuHeader = ({
	title,
	position,
	children,
}: {
	title: string;
	position: 'left' | 'right';
	children: ReactNode;
}) => {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<Stack
			bgcolor={'skyblue'}
			width={'100%'}
			height={'70px'}
			flexDirection={'row'}
			justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}
		>
			{openMenu && (
				<HambergurMenu title={title} position={position} setIsOpened={setOpenMenu}>
					{children}
				</HambergurMenu>
			)}
			<IconButton onClick={() => setOpenMenu(true)}>
				<MenuIcon fontSize={'large'} />
			</IconButton>
		</Stack>
	);
};
