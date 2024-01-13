import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';
import { Container, Box } from '@mui/material';

const Test = () => {
	return (
		<Container maxWidth="xs">
			<Box display="flex" flexDirection="column" justifyItems="center">
				<OpenProfileAvatar otherUserId={'123'} />
				<OpenProfileAvatar otherUserId={'123'} />
				<OpenProfileAvatar otherUserId={'123'} />
				<OpenProfileAvatar otherUserId={'123'} />
				<OpenProfileAvatar otherUserId={'123'} />
			</Box>
		</Container>
	);
};

export default Test;
