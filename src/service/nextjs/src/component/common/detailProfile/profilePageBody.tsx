import { Container, Typography, Box } from '@mui/material';
import NewIcon from '../../profile/common/newIcon';
import BottomProfile from './bottomProfile';
import { otherUser } from './openProfileAvatar';

const ar = {
	image: '/Mail.png',
	name: 'DM',
	sxStyle: { width: 150, height: 150 },
	imgStyle: {},
	message: undefined,
};

const ProfilePageBody = ({
	otherUserId,
	img,
	name,
	state,
	isFriend,
}: { otherUserId: string } & otherUser) => {
	return (
		<div>
			<Container maxWidth="xs">
				<NewIcon {...ar} image={img} />
				<Box marginTop="10%" display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h5">{name}</Typography>
					<Typography style={{ opacity: 0.5 }} variant="h6">
						{state}
					</Typography>
				</Box>
				<BottomProfile otherUserId={otherUserId} isFriend={isFriend} />
			</Container>
		</div>
	);
};

export default ProfilePageBody;
