import FightRecord, { fightRecordProps } from './fightRecord';
import { Box, Typography } from '@mui/material';

export interface fightRecordsProps {
	fightRecords: fightRecordProps[];
}

const FightRecords = ({ fightRecords }: fightRecordsProps) => (
	<Box>
		<Typography variant="h5">최근 전적</Typography>
		{fightRecords.map((data, index) => (
			<Box textAlign="center" key={index}>
				<FightRecord {...data} />
			</Box>
		))}
	</Box>
);

export default FightRecords;
