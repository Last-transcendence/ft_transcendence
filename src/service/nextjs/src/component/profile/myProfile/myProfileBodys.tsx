import styles from '@/style/profile/myProfile/index.module.css';
import { Container, Box } from '@mui/material';
import FightRecords from './fightRecords';
import MyProfileMenu from './myProfileMenu';
import ProfileAvartar from './profileAvatar';
import TwoFACheck from './2faCheck';
import { myImageProps } from '../common/myImage';
import UserId from '@/component/profile/myProfile/userId';
import Game from '@/type/game.type';
import { useState, useEffect, useContext } from 'react';
import Odds from './odds';
import GameContext from '@/context/game.context';

export interface myProfilePageProps extends myImageProps {
	use2fa?: boolean;
}

const MyProfileBody = ({ name, use2fa, image }: myProfilePageProps) => {
	const [gameRecordsErrorMessage, setGameRecordsErrorMessage] = useState<string>('');
	const { game } = useContext(GameContext);

	useEffect(() => {
		const update = (game: Game[]) => {
			if (game.length === 0) {
				setGameRecordsErrorMessage('데이터 없음');
			}
		};
		if (game !== null) {
			update(game);
		}
	}, [game]);

	return (
		<Box overflow="auto">
			<Container maxWidth="xs" sx={{ paddingBottom: 15 }}>
				<MyProfileMenu />
				<ProfileAvartar name={name} image={image} />
				<UserId userName={name} />
				<Box display="flex" flexDirection="column" alignItems="center">
					<TwoFACheck twoFA={use2fa} />
					{game === null ? (
						<></>
					) : (
						<div className={styles['my-profile-body__div']}>
							<Odds gameRecords={game} message={gameRecordsErrorMessage} />
						</div>
					)}
				</Box>
				{game === null ? (
					<></>
				) : (
					<FightRecords fightRecords={game.slice(0, 5)} message={gameRecordsErrorMessage} />
				)}
			</Container>
		</Box>
	);
};

export default MyProfileBody;
