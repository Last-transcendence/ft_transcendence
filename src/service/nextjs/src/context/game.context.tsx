import { getFetcher } from '@/service/api';
import Game from '@/type/game.type';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import AuthContext from './auth.context';

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
	const { me } = useContext(AuthContext);

	useEffect(() => {
		if (!game && me) {
			getFetcher<Game[]>('/game/history')
				.then(response => {
					setGame(response);
				})
				.catch(error => {
					setGame(null);
				});
		}
	}, [game, me]);

	return <GameContext.Provider value={{ game, setGame }}>{children}</GameContext.Provider>;
};

export default GameContext;
