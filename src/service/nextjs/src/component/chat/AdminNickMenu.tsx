import React, { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import { postFetcher } from '@/service/api';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import SocketContext from '@/context/socket.context';

interface NickMenuProps {
	nickname: string;
	userId: string;
	channelId: string;
	ownerId?: string;
	isMute?: boolean;
}

const AdminNickMenu = ({ nickname, userId, channelId, ownerId, isMute }: NickMenuProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { me } = useContext(AuthContext);
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuClick = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const { id: targetId } = e.target as HTMLLIElement;
		switch (targetId) {
			case 'kickBtn':
				postFetcher(`/channel/${channelId}/kick/${userId}`);
				break;
			case 'banBtn':
				postFetcher(`/channel/${channelId}/ban/${userId}`);
				break;
			case 'muteBtn':
				postFetcher(`/channel/${channelId}/mute/${userId}`);
				break;
			case 'adminBtn':
				//how to set admin?
				break;
			default:
				break;
		}
	};

	return (
		<>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem>{nickname}</MenuItem>
				{userId !== me?.id && userId !== ownerId && (
					<>
						<MenuItem id={'kickBtn'} onClick={handleMenuClick}>
							추방하기
						</MenuItem>
						<MenuItem id={'banBtn'} onClick={handleMenuClick}>
							밴하기
						</MenuItem>
						<MenuItem id={'muteBtn'} onClick={handleMenuClick} disabled={isMute}>
							뮤트하기
						</MenuItem>
					</>
				)}
				{ownerId === me?.id && (
					<MenuItem id={'adminBtn'} onClick={handleMenuClick}>
						어드민임명
					</MenuItem>
				)}
			</Menu>
			<Stack flexDirection={'row'} gap={1}>
				<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
					{nickname}
				</Typography>
			</Stack>
		</>
	);
};

export default AdminNickMenu;
