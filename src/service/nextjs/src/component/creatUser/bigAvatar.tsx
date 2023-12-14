import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

const BigAvatar = styled(Avatar)(({ theme }) => ({
	width: 150,
	height: 150,
	margin: 0,
	border: `2px solid ${theme.palette.background.paper}`,
	marginTop: '10%',
}));

export default BigAvatar;
