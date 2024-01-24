import { Grid, Box } from '@mui/material';
import Mydate from './fightDate';
import MatchPoint, { matchPointProps } from './matchPoint';
import User from '@/type/user.type';
import Game from '@/type/game.type';
import { useEffect, useState } from 'react';
import { getFetcher } from '@/service/api';
import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';

export interface fightRecordProps extends matchPointProps {
	player1: User;
	player2: User;
	createdAt: string;
	mode: string;
	result: string;
}

const FightRecord = ({
	player1Id,
	player2Id,
	mode,
	createdAt,
	player1Score,
	player2Score,
	result,
}: Game) => {
	const [recordData, setRecordData] = useState<fightRecordProps | undefined>(undefined);
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		const loadRecordData = async () => {
			try {
				const player1 = await getFetcher<User>(`user/${player1Id}`);
				const player2 = await getFetcher<User>(`user/${player2Id}`);
				setRecordData({
					player1: player1,
					player2: player2,
					player1Score: player1Score,
					player2Score: player2Score,
					result: result,
					createdAt: createdAt,
					mode: mode,
				});
			} catch (error: any) {
				setErrorMessage(error.message);
			}
		};

		loadRecordData();
	}, [mode, result, player1Id, player2Id, player1Score, player2Score, createdAt]);

	return recordData !== undefined &&
		recordData.player1 !== undefined &&
		recordData.player2 &&
		errorMessage === '' ? (
		<Box marginBottom={2}>
			<Mydate date={createdAt} />
			<Box
				border={2}
				borderRadius={3}
				boxShadow={1}
				padding={2}
				color={mode === 'NORMAL' ? 'black' : mode === 'HARD' ? 'tomato' : 'blue'}
			>
				<Grid container display="flex" flexDirection="row" alignItems="center">
					<Grid item xs={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<OpenProfileAvatar
							imgUrl={recordData.player1.profileImageURI || ''}
							otherUserId={recordData.player1.id}
						/>
						<p>{recordData.player1.nickname}</p>
					</Grid>
					<Grid item xs={4}>
						<p>{result === 'LOSE' ? '패배' : '승리'}</p>
						<MatchPoint
							player1Score={recordData.player1Score}
							player2Score={recordData.player2Score}
						/>
					</Grid>
					<Grid item xs={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<OpenProfileAvatar
							imgUrl={recordData.player2.profileImageURI || ''}
							otherUserId={recordData.player2.id}
						/>
						<p>{recordData.player2.nickname}</p>
					</Grid>
				</Grid>
			</Box>
		</Box>
	) : (
		<Box marginBottom={2}>
			<Box border={3} borderRadius={3} boxShadow={1} padding={2} color={'black'}>
				{errorMessage}
			</Box>
		</Box>
	);
};

export default FightRecord;
