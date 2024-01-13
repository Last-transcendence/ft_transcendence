import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
	'&.newStyle': {
		position: 'fixed',
		bottom: 0,
		height: 50,
		color: 'white',
		fontSize: 20,
		left: 0,
	},
});

export default CustomButton;
