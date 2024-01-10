import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { postFetcher } from '@/service/api';

//@todo 추후에 props의 optional 빼기
interface NickMenuProps {
	nickname: string;
	userId: string;
	channelId: string;
	isOwner: boolean;
}
export const AdminNickMenu = ({ nickname, userId, channelId, isOwner }: NickMenuProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// admin이 owner를 kick할 수 있을까?
	const handleMenuClick = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const { id: targetId } = e.target as HTMLLIElement;
		switch (targetId) {
			case 'nickBtn':
				// navigate(`/profile/${userId}`);
				// 프로필 오픈
				break;
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
				<MenuItem id={'nickBtn'} onClick={handleMenuClick}>
					{nickname}
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
				{isOwner && (
					<MenuItem id={'adminBtn'} onClick={handleMenuClick}>
						어드민임명
					</MenuItem>
				)}
			</Menu>
			<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
				{nickname}
			</Typography>
		</>
	);
};

export const NickMenu = ({ nickname, userId }: { nickname: string; userId: string }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuClick = () => {
		// navigate(`/profile/${userId}`);
		// 프로필 오픈
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleMenuClick}>{nickname}</MenuItem>
			</Menu>
			<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
				{nickname}
			</Typography>
		</>
	);
};
