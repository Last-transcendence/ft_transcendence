import { Typography } from '@mui/material';

const Mydate = ({ date }: { date: string }) => {
	const gameDate = date.substring(0, date.indexOf('T')) + ' ' + date.substring(date.indexOf('T') + 1, date.lastIndexOf('.'));
	return (
	<Typography display="flex" flexDirection="column" alignItems="flex-end" variant="subtitle2">
		date : {gameDate}
	</Typography>
)};

export default Mydate;
