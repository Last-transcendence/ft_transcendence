import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';
import { Container, Box } from '@mui/material';

const Test = () => {
	return (
		<Container maxWidth="xs">
			<Box display="flex" flexDirection="column" justifyItems="center">
				<OpenProfileAvatar isMe={false} otherUserId={'123'} friendList={['chl']} />
				<OpenProfileAvatar isMe={false} otherUserId={'123'} friendList={['chl']} />
				<OpenProfileAvatar isMe={true} otherUserId={'123'} friendList={['chl']} />
				<OpenProfileAvatar isMe={true} otherUserId={'123'} friendList={['chl']} />
				<OpenProfileAvatar isMe={true} otherUserId={'123'} friendList={['chl']} />
			</Box>
		</Container>
	);
};

export default Test;
