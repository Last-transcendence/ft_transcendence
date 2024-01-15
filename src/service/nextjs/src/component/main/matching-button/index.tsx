'use client';

import { useContext } from 'react';
import style from '../../../style/main/matching-button/index.module.css';
import MatchingButtonIcon from './icon';
import SocketContext from '@/context/socket.context';
import { useRouter } from 'next/navigation';

const MatchingButton = () => {
	const { sockets } = useContext(SocketContext);
	const navigate = useRouter();

	if (!sockets.gameSocket) {
		return;
	}

	return (
		<div className={style.container}>
			<div>
				<MatchingButtonIcon
					width={'75cqw'}
					height={'75cqw'}
					onClick={() => {
						alert('matching button clicked');
						sockets.gameSocket?.on('queue', response => {
							console.log(response);
							navigate.push(`/game/${response.id}`);
						});
					}}
				/>
			</div>
		</div>
	);
};

export default MatchingButton;
