import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { Menu, ArrowBackIosNew } from '@mui/icons-material';
import HambergurMenu from '@/component/common/hambergur-menu';
import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MenuHeaderProps {
	type?: 'friend' | 'chat';
	title: string;
	children?: ReactNode;
}

export const Header = ({ title }: { title: string }) => {
	const router = useRouter();
	return (
		<Stack
			bgcolor={'skyblue'}
			width={'100%'}
			height={'70px'}
			flexDirection={'row'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Stack flex={1}>
				<Box>
					<IconButton onClick={() => router.back()}>
						<ArrowBackIosNew fontSize={'large'} />
					</IconButton>
				</Box>
			</Stack>
			<Stack flex={1} alignItems={'center'}>
				<Typography>{title}</Typography>
			</Stack>
			<Box flex={1} />
		</Stack>
	);
};

export const MenuHeader = ({ type, title, children }: MenuHeaderProps) => {
	const [openMenu, setOpenMenu] = useState(false);
	const router = useRouter();

	return (
		<div>
			{openMenu && (
				<HambergurMenu
					title={title}
					position={type === 'friend' ? 'left' : 'right'}
					setIsOpened={setOpenMenu}
				>
					{children}
				</HambergurMenu>
			)}
			<Stack
				bgcolor={'skyblue'}
				width={'100%'}
				height={'70px'}
				flexDirection={type === 'chat' ? 'row' : 'row-reverse'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				{type === 'chat' ? (
					<IconButton onClick={() => router.push('/')}>
						<ArrowBackIosNew fontSize={'large'} />
					</IconButton>
				) : (
					<IconButton onClick={() => router.push('/profile/myProfile')}>
						<Avatar />
					</IconButton>
				)}
				<Typography>{title}</Typography>
				<IconButton onClick={() => setOpenMenu(true)}>
					<Menu fontSize={'large'} />
				</IconButton>
			</Stack>
		</div>
	);
};
