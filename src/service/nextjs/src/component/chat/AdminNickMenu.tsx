import React, { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import { Menu, MenuItem, Typography } from '@mui/material';
import SocketContext from '@/context/socket.context';
import { AdminActionType } from '@/type/channel.type';

interface NickMenuProps {
	nickname: string;
	userId: string;
	channelId: string;
	ownerId?: string;
	isMute?: boolean;
	adminAction?: (action: AdminActionType, nickname: string, id: string) => void;
}

const AdminNickMenu = ({
	nickname,
	userId,
	channelId,
	ownerId,
	isMute,
	adminAction,
}: NickMenuProps) => {
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
		if (!adminAction) return;
		const { id: targetId } = e.target as HTMLLIElement;
		const req = {
			channelId,
			userId: me?.id,
			toUserId: userId,
			nickname,
		};
		console.log('req', req);
		switch (targetId) {
			case 'kickBtn':
				channelSocket?.emit('kick', req, (res: any) => {
					console.log('kick res', res);
					adminAction('kick', nickname, userId);
				});
				break;
			case 'banBtn':
				channelSocket?.emit('ban', req, (res: any) => {
					console.log('ban res', res);
					adminAction('ban', nickname, userId);
				});
				break;
			case 'muteBtn':
				channelSocket?.emit('mute', req, (res: any) => {
					console.log('mute res', res);
					adminAction('mute', nickname, userId);
				});
				break;
			case 'adminBtn':
				channelSocket?.emit('role', req, (res: any) => {
					console.log('admin res', res);
					if (adminAction) {
						adminAction('admin', nickname, userId);
					}
				});
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
					<div>
						<MenuItem id={'kickBtn'} onClick={handleMenuClick}>
							킥하기
						</MenuItem>
						<MenuItem id={'banBtn'} onClick={handleMenuClick}>
							밴하기
						</MenuItem>
						<MenuItem id={'muteBtn'} onClick={handleMenuClick} disabled={isMute}>
							뮤트하기
						</MenuItem>
					</div>
				)}
				{userId !== me?.id && ownerId === me?.id && (
					<MenuItem id={'adminBtn'} onClick={handleMenuClick}>
						어드민 임명
					</MenuItem>
				)}
			</Menu>
			<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
				{nickname}
			</Typography>
		</>
	);
};

export default AdminNickMenu;
