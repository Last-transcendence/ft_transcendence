'use client';

import { useContext } from 'react';
import style from '../../../style/main/matching-button/index.module.css';
import MatchingButtonIcon from './icon';
import SocketContext from '@/context/socket.context';
import { useRouter } from 'next/navigation';

const MatchingButton = () => {
	const { sockets } = useContext(SocketContext);
	const navigate = useRouter();
	const socket = sockets.gameSocket;

	if (!socket) {
		return null;
	}

	return (
		<div className={style.container}>
			<div>
				<MatchingButtonIcon
					width={'75cqw'}
					height={'75cqw'}
					onClick={() => {
						socket.on('matched', response => {
							socket.off('matched');
							navigate.push(`/game/${response.id}`);
						});
						socket.emit('queue');
					}}
				/>
			</div>
		</div>
	);
};

export default MatchingButton;
