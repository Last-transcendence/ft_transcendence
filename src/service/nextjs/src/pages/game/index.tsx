import {
	Dispatch,
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GameInstance, IonPhaser } from '@ion-phaser/react';
import Config from '@/component/game/config';
import style from '@/style/game/index.module.css';
import SocketContext from '@/context/socket.context';
import IsWithAuth from '@/component/common/accessControl/IsWithAuth';

const destroy = (props: {
	gameRef: RefObject<HTMLIonPhaserElement>;
	setGame: Dispatch<SetStateAction<GameInstance | undefined>>;
	setIsInitialized: Dispatch<SetStateAction<boolean>>;
}) => {
	const { gameRef, setGame, setIsInitialized } = props;

	if (gameRef.current) {
		setGame(undefined);
		setIsInitialized(false);
		gameRef.current.destroy();
	}
};

const GameQueuePage = () => {
	const navigate = useRouter();
	const searchParam = useSearchParams();
	const gameRoomId = searchParam.get('gameRoomId');
	const gameRef = useRef<HTMLIonPhaserElement>(null);
	const [game, setGame] = useState<GameInstance | undefined>(undefined);
	const [isInitialized, setIsInitialized] = useState(false);
	const { sockets } = useContext(SocketContext);
	const socket = sockets.gameSocket;

	useEffect(() => {
		if (navigate && socket) {
			setIsInitialized(true);

			import('@/component/game/scene').then(Scene => {
				setGame({
					...Config,
					scene: [
						new Scene.Queue(navigate, socket, gameRoomId),
						new Scene.Main(),
						new Scene.Result(),
					],
				});
			});

			return () => destroy({ gameRef, setGame, setIsInitialized });
		}
	}, [navigate, socket]);

	return (
		isInitialized && (
			<IonPhaser
				game={game}
				ref={gameRef}
				initialize={isInitialized}
				placeholder={'Loading...'}
				className={style.container}
			/>
		)
	);
};

export default IsWithAuth(GameQueuePage);
