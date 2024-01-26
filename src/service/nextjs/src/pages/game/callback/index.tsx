import GameContext from '@/context/game.context';
import { getFetcher } from '@/service/api';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const GameCallbackPage = () => {
	const { setGame } = useContext(GameContext);
	const navigate = useRouter();

	useEffect(() => {
		getFetcher('/game/history')
			.then((response: any) => {
				setGame(response.data);
			})
			.catch((error: any) => {
				console.error(error);
			});
		navigate.push('/');
	}, [setGame, navigate]);

	return <></>;
};

export default GameCallbackPage;
