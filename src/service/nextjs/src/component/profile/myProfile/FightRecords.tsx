import FightRecord from './FightRecord';
import { Box, Typography } from '@mui/material';
import Game from '@/type/game.type';

const FightRecords = ({ fightRecords, message }: { fightRecords: Game[]; message: string }) => {
	return (
		<Box>
			<Typography variant="h5">최근 전적</Typography>
			{message === '' &&
				fightRecords.map((data, index) => (
					<Box textAlign="center" key={index}>
						<FightRecord {...data} />
					</Box>
				))}
			{message.length !== 0 ? <p>{message}</p> : <></>}
		</Box>
	);
};

export default FightRecords;
