import { Typography } from '@mui/material';

export interface matchPointProps {
	score1: number;
	score2: number;
}

const MatchPoint = ({ score1, score2 }: matchPointProps) => {
	return (
		<div>
			<Typography variant="h5">
				{score1} vs {score2}
			</Typography>
		</div>
	);
};

export default MatchPoint;
