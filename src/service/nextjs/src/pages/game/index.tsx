// /game/{gameId} 에서 게임 진행할 것 같아서 /game route에 페이지를 만들어야할 지 모르겠네요,,,
// Phaser 공부용으로 해당 경로 사용하겠습니다.

import { GameInstance, IonPhaser } from '@ion-phaser/react';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import Config from '@/component/game/config';
import style from '@/style/game/index.module.css';

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

	useEffect(() => {
		setIsClient(true);

		import('@/component/game/scene/main').then(({ default: MainScene }) => {
			setGame({
				...Config,
				scene: new MainScene(),
			});
		});

		return () => destroy({ gameRef, setGame, setInitialized });
	}, []);

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
