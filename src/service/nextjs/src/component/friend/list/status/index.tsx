'use client';

import style from '../../../../style/friend/list/status/index.module.css';
import { Typography } from '@mui/material';
import { UserStatus } from '@/type';

const statusLabel = [
	{ color: '#1CB119', label: '온라인' },
	{ color: '#495D49', label: '오프라인' },
	{ color: '#9C27B0', label: '게임중' },
];

interface StatusProps {
	status: UserStatus;
}

const FriendStatus = ({ status }: StatusProps) => {
	return (
		<div className={style.container}>
			<Typography color={statusLabel[status]?.color}>{statusLabel[status]?.label}</Typography>
		</div>
	);
};

export default FriendStatus;
