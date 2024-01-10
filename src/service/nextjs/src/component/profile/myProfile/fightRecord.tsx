import { Grid, Box } from '@mui/material';
import Mydate from './fightDate';
import NewIcon from '../common/newIcon';
import { myImageProps, imgStyle } from '../common/myImage';
import MatchPoint, { matchPointProps } from './matchPoint';
import { avatarStyle } from '../common/newAvatar';

export interface fightRecordProps extends matchPointProps {
	user1: myImageProps;
	user2: myImageProps;
	matchTime: string;
}

const sxStyle: avatarStyle = {
	width: 80,
	height: 80,
	backgroundColor: '#99DDDD',
};

const imgStyle: imgStyle = {
	width: '100%',
	height: '100%',
};

const FightRecord = ({ user1, user2, matchTime, ...matchPoint }: fightRecordProps) => {
	return (
		<Box marginBottom={2}>
			<Mydate date={matchTime} />
			<Box border={1} borderRadius={3} boxShadow={1} padding={2}>
				<Grid container display="flex" flexDirection="row" alignItems="center">
					<Grid item xs={4}>
						<NewIcon message={user1.name} {...user1} sxStyle={sxStyle} avatarImgStyle={imgStyle} />
					</Grid>
					<Grid item xs={4}>
						<MatchPoint {...matchPoint} />
					</Grid>
					<Grid item xs={4}>
						<NewIcon message={user2.name} {...user2} sxStyle={sxStyle} avatarImgStyle={imgStyle} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default FightRecord;
