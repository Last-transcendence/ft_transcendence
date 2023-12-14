import { Container } from '@mui/material';
import Agree2FABody from './Agree2FABody';
import Agree2FAButton from './agree2FAButton';

const Agree2FAPage = () => {
	return (
		<Container maxWidth="xs">
			<Agree2FABody />;
			<Agree2FAButton />;
		</Container>
	);
};

export default Agree2FAPage;
