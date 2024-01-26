import { Typography } from '@mui/material';

export interface matchPointProps {
	player1Score: number,
	player2Score: number,
}

const MatchPoint = ({ player1Score, player2Score }: matchPointProps) => {
	return (
		<div>
			<Typography variant="h5">
				{player1Score} vs {player2Score}
			</Typography>
		</div>
	);
};

export default MatchPoint;
