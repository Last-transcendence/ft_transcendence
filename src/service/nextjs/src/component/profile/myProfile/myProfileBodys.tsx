import styles from '@/style/profile/myProfile/index.module.css';
import { Container, Box } from '@mui/material';
import FightRecords from './fightRecords';
import MyProfileMenu from './myProfileMenu';
import ProfileAvartar from './profileAvatar';
import TwoFACheck from './2faCheck';
import { myImageProps } from '../common/myImage';
import UserId from '@/component/profile/myProfile/userId';
import Game from '@/type/game.type';
import { useState, useEffect } from 'react';
import { getFetcher } from '@/service/api';
import Odds from './odds';

export interface myProfilePageProps extends myImageProps {
	use2fa?: boolean;
}

const MyProfileBody = ({ name, use2fa, image }: myProfilePageProps) => {
	const [gameRecords, setGameRecords] = useState<Game[] | undefined>(undefined);
	const [gameRecordsErrorMessage, setGameRecordsErrorMessage] = useState<string>('');

	useEffect(() => {
		const roadGameRecord = async () => {
			try {
				const gameData = await getFetcher<Game[]>('/game/history');
				setGameRecords(gameData);
			} catch (error) {
				setGameRecordsErrorMessage('데이터를 로드할 수 없습니다.');
			}
		};
		roadGameRecord();
	}, []);

	return (
		<Box overflow="auto">
			<Container maxWidth="xs" sx={{ paddingBottom: 15 }}>
				<MyProfileMenu />
				<ProfileAvartar name={name} image={image} />
				<UserId userName={name} />
				<Box display="flex" flexDirection="column" alignItems="center">
					<TwoFACheck twoFA={use2fa} />
					{gameRecords === undefined ? (
						<></>
					) : (
						<div className={styles['my-profile-body__div']}>
							<Odds gameRecords={gameRecords} message={gameRecordsErrorMessage} />
						</div>
					)}
				</Box>
				{gameRecords === undefined ? (
					<></>
				) : (
					<FightRecords fightRecords={gameRecords.slice(0, 5)} message={gameRecordsErrorMessage} />
				)}
			</Container>
		</Box>
	);
};

export default MyProfileBody;
