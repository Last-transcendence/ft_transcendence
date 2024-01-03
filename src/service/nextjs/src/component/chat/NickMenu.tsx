import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import api from '@/component/api/base';

//@todo 추후에 props의 optional 빼기
interface NickMenuProps {
	nickname: string;
	userId?: string;
	channelId?: string;
}
export const NickMenu = ({ nickname, userId, channelId }: NickMenuProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuClick = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const { id: targetId } = e.target as HTMLLIElement;
		switch (targetId) {
			case 'nickBtn':
				// navigate(`/profile/${id}`)
				// 프로필 오픈
				break;
			case 'kickBtn':
				await api.post(`/channel/${channelId}/kick/${userId}`);
				break;
			case 'banBtn':
				//how to ban?
				///channel/{id}/ban
				break;
			case 'muteBtn':
				//how to mute?
				///channel/{id}/mute
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
				<MenuItem id={'adminBtn'} onClick={handleMenuClick}>
					어드민임명
				</MenuItem>
			</Menu>
			<Typography fontWeight={'bold'} sx={{ cursor: 'pointer' }} onClick={handleClick}>
				{nickname}
			</Typography>
		</>
	);
};

export default NickMenu;
