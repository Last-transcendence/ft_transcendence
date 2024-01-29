import { Typography } from '@mui/material';

const Mydate = ({ date }: { date: string }) => {
	const gameDate = new Date(date.substring(0, date.indexOf('T')) + ' ' + date.substring(date.indexOf('T') + 1, date.lastIndexOf('.')));
	gameDate.setHours(gameDate.getHours() + 9);
	const year = gameDate.getFullYear();
	const month = ('0' + (gameDate.getMonth() + 1)).slice(-2);  // 월은 0부터 시작하므로 +1 필요
	const day = ('0' + gameDate.getDate()).slice(-2);
	const hours = ('0' + gameDate.getHours()).slice(-2);
	const minutes = ('0' + gameDate.getMinutes()).slice(-2);
	const seconds = ('0' + gameDate.getSeconds()).slice(-2);
	const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	return (
	<Typography display="flex" flexDirection="column" alignItems="flex-end" variant="subtitle2">
		date : {formattedDate}
	</Typography>
)};

export default Mydate;
