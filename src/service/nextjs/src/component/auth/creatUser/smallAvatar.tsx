import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 50,
	height: 50,
	border: `2px solid ${theme.palette.background.paper}`,
}));

export default SmallAvatar;
