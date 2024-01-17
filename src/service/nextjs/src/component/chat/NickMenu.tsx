import React, { useContext } from 'react';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import { postFetcher } from '@/service/api';
import AuthContext from '@/context/auth.context';
import { Mute } from '@/type/channel.type';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const NickMenu = ({ nickname }: { nickname: string }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem>{nickname}</MenuItem>
			</Menu>
			<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
				{nickname}
			</Typography>
		</>
	);
};

export default NickMenu;
