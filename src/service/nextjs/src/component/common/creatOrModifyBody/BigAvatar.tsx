import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

const BigAvatar = styled(Avatar)(({ theme }) => ({
	width: 150,
	height: 150,
	border: `1px solid black`,
}));

export default BigAvatar;
