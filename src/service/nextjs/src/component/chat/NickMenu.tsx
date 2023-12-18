import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

interface NickMenuProps {
	nick: string;
}
export const NickMenu = ({ nick }: NickMenuProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const { id: targetId } = e.target as HTMLLIElement;
		switch (targetId) {
			case 'nickBtn':
				alert('nickBtn');
				break;
			case 'kickBtn':
				alert('kickBtn');
				break;
			case 'banBtn':
				alert('banBtn');
				break;
			case 'muteBtn':
				alert('muteBtn');
				break;
			case 'adminBtn':
				alert('adminBtn');
				break;
			default:
				break;
		}
	};
	return (
		<>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem id={'nickBtn'} onClick={handleMenuClick}>
					{nick}
				</MenuItem>
				<MenuItem id={'kickBtn'} onClick={handleMenuClick}>
					추방하기
				</MenuItem>
				<MenuItem id={'banBtn'} onClick={handleMenuClick}>
					밴하기
				</MenuItem>
				<MenuItem id={'muteBtn'} onClick={handleMenuClick}>
					뮤트하기
				</MenuItem>
				<MenuItem id={'adminBtn'} onClick={handleMenuClick}>
					어드민임명
				</MenuItem>
			</Menu>
			<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
				{nick}
			</Typography>
		</>
	);
};

export default NickMenu;
