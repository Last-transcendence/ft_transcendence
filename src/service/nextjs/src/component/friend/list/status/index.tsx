'use client';

import style from '../../../../style/friend/list/status/index.module.css';
import { Typography } from '@mui/material';

export type statusType = '온라인' | '오프라인' | '게임 중' | '친구' | '';
interface StatusProps {
	status: statusType;
}

const FriendStatus = ({ status }: StatusProps) => {
	const colors: { [key in statusType]: string } = {
		온라인: '#1CB119',
		오프라인: '#495D49',
		'게임 중': '#9C27B0',
		친구: '#1CB119',
		'': 'black',
	};

	return (
		<div className={style.container}>
			<Typography color={colors[status]}>{status}</Typography>
		</div>
	);
};

export default FriendStatus;
