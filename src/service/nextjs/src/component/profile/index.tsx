import { Container, Typography, Box } from '@mui/material';
import NewIcon from './newIcon';
import BottomProfile from './bottomProfile';

const ar = {
	image: '/Mail.png',
	altText: 'DM',
	sxStyle: { width: 150, height: 150 },
	imageStyle: {},
	message: undefined,
};

const ProfilePage = () => {
	return (
		<div>
			<Container maxWidth="xs">
				<NewIcon {...ar} />
				<Box marginTop="10%" display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h5">이름</Typography>
					<Typography style={{ opacity: 0.5 }} variant="h6">
						상태
					</Typography>
				</Box>
				<BottomProfile />
			</Container>
		</div>
	);
};

export default ProfilePage;
