import { GameInstance, IonPhaser } from '@ion-phaser/react';
import {
	Dispatch,
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import Config from '@/component/game/config';
import style from '@/style/game/index.module.css';
import SocketContext from '@/context/socket.context';

const destroy = (props: {
	gameRef: RefObject<HTMLIonPhaserElement>;
	setGame: Dispatch<SetStateAction<GameInstance | undefined>>;
	setInitialized: Dispatch<SetStateAction<boolean>>;
}) => {
	const { gameRef, setGame, setInitialized } = props;

	if (gameRef.current) {
		setGame(undefined);
		setInitialized(false);
		gameRef.current.destroy();
	}
};

const GamePage = () => {
	const gameRef = useRef<HTMLIonPhaserElement>(null);
	const [game, setGame] = useState<GameInstance>();
	const [initialized, setInitialized] = useState(true);
	const [isClient, setIsClient] = useState(false);
	const { sockets } = useContext(SocketContext);
	const socket = sockets.gameSocket;

	useEffect(() => {
		if (socket) {
			setIsClient(true);

			import('@/component/game/scene').then(({ MainScene }) => {
				setGame({
					...Config,
					scene: new MainScene(socket),
				});
			});

			return () => destroy({ gameRef, setGame, setInitialized });
		}
	}, [socket]);

	return (
		isClient && (
			<IonPhaser
				ref={gameRef}
				game={game}
				initialize={initialized}
				placeholder={'Loading...'}
				className={style.container}
			/>
		)
	);
};

export default GamePage;
