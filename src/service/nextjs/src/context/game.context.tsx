import { axiosInstance } from '@/service/api';
import Game from '@/type/game.type';
import axios from 'axios';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

const GameContext = createContext<{
	game: Game[] | null;
	setGame: Dispatch<SetStateAction<Game[] | null>>;
}>({
	game: null,
	setGame: () => {},
});

export const GameProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [game, setGame] = useState<Game[] | null>(null);

	useEffect(() => {
		if (!game) {
			axiosInstance
				.get('/game/history')
				.then(response => {
					setGame(response.data);
				})
				.catch(error => {
					setGame(null);
					console.error(error);
				});
		}
	}, [game]);

	return <GameContext.Provider value={{ game, setGame }}>{children}</GameContext.Provider>;
};

export default GameContext;
