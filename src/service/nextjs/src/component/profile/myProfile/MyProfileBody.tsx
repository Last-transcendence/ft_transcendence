import styles from '@/style/profile/myProfile/index.module.css';
import { Container, Box } from '@mui/material';
import FightRecords from './FightRecords';
import MyProfileMenu from './MyProfileMenu';
import TwoFACheck from './TwoFACheck';
import { myImageProps } from '../common/MyImage';
import UserId from '@/component/profile/myProfile/UserId';
import Game from '@/type/game.type';
import Odds from './Odds';
import { useState, useEffect, useContext } from 'react';
import GameContext from '@/context/game.context';
import ProfileAvatar from '@/component/profile/myProfile/ProfileAvatar';

export interface myProfilePageProps extends myImageProps {
	use2fa?: boolean;
}

const MyProfileBody = ({ name, use2fa, image }: myProfilePageProps) => {
	const [gameRecordsErrorMessage, setGameRecordsErrorMessage] =
		useState<string>('게임 이력이 없습니다.');
	const { game } = useContext(GameContext);

	if (!game) {
		return null;
	}

	return (
		<Box overflow="auto">
			<Container maxWidth="xs" sx={{ paddingBottom: 15 }}>
				<MyProfileMenu />
				<ProfileAvatar name={name} image={image} />
				<UserId userName={name} />
				<Box display="flex" flexDirection="column" alignItems="center">
					<TwoFACheck twoFA={use2fa} />
					<div>
						<Odds gameRecords={game} message={gameRecordsErrorMessage} />
					</div>
				</Box>
				{game.length === 0 ? (
					<p>게임 이력이 없습니다.</p>
				) : (
					<FightRecords fightRecords={game.slice(0, 5)} message={gameRecordsErrorMessage} />
				)}
			</Container>
		</Box>
	);
};

export default MyProfileBody;
