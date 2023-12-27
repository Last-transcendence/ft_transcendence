import { Typography } from '@mui/material';

const Mydate = ({ date }: { date: string }) => (
	<Typography display="flex" flexDirection="column" alignItems="flex-end" variant="subtitle2">
		date : {date}
	</Typography>
);

export default Mydate;
