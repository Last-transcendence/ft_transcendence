import { Grid, Box } from '@mui/material';
import Mydate from './fightDate';
import MatchPoint, { matchPointProps } from './matchPoint';
import { avatarStyle } from '../common/newAvatar';
import User from '@/type/user.type';
import Game from '@/type/game.type';
import { useEffect, useState } from 'react';
import { getFetcher } from '@/service/api';
import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';

export interface fightRecordProps extends matchPointProps {
	user1: User;
	user2: User;
	matchTime?: string;
	mode: number;
	matchResult: number;
}

const sxStyle: avatarStyle = {
	width: 80,
	height: 80,
	backgroundColor: '#99DDDD',
};

const FightRecord = ({
	userId1,
	userId2,
	userScore1,
	userScore2,
	mode,
	result,
	createdAt,
}: Game) => {
	const [recordData, setRecordData] = useState<fightRecordProps | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const loadRecordData = async () => {
			try {
				const user1 = await getFetcher<User>(`user/${userId1}`);
				const user2 = await getFetcher<User>(`user/${userId2}`);
				setRecordData({
					user1: user1,
					user2: user2,
					score1: userScore1,
					score2: userScore2,
					matchResult: result,
					mode: mode,
				});
			} catch (error) {
				setLoading(true);
			}
		};
		loadRecordData();
	}, [mode, result, userId1, userId2, userScore1, userScore2]);
	return (
		<>
			{loading ? (
				<Box marginBottom={2}>
					<Mydate date={createdAt} />
					<Box
						border={2}
						borderRadius={3}
						boxShadow={1}
						padding={2}
						color={mode === 0 ? 'black' : mode === 1 ? 'tomato' : 'blue'}
					>
						<Grid container display="flex" flexDirection="row" alignItems="center">
							<Grid item xs={4}>
								<OpenProfileAvatar
									imgUrl={recordData?.user1.profileImageURI}
									otherUserId={recordData?.user1.id || ''}
								/>
								<p>{recordData?.user1.nickname}</p>
							</Grid>
							<Grid item xs={4}>
								<p>{result === 0 ? '패배' : result === 1 ? '승리' : '무승부'}</p>
								<MatchPoint score1={recordData?.score1 || 0} score2={recordData?.score2 || 0} />
							</Grid>
							<Grid item xs={4}>
								<OpenProfileAvatar
									otherUserId={recordData?.user2.id || ''}
									imgUrl={recordData?.user2.profileImageURI}
								/>
								<p>{recordData?.user2.nickname}</p>
							</Grid>
						</Grid>
					</Box>
				</Box>
			) : (
				<Box marginBottom={2}>
					<Box border={3} borderRadius={3} boxShadow={1} padding={2} color={'black'}>
						데이터 로딩 실패
					</Box>
				</Box>
			)}
			;
		</>
	);
};

export default FightRecord;
