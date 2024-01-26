import styles from '@/style/profile/myProfile/index.module.css';
import { Container, Box } from '@mui/material';
import FightRecords from './FightRecords';
import MyProfileMenu from './MyProfileMenu';
import ProfileAvatar from './ProfileAvatar';
import TwoFACheck from './TwoFACheck';
import { myImageProps } from '../common/MyImage';
import UserId from '@/component/profile/myProfile/UserId';
import Game from '@/type/game.type';
import Odds from './Odds';
import { useState, useEffect, useContext } from 'react';
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
				<ProfileAvatar name={name} image={image} />
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
