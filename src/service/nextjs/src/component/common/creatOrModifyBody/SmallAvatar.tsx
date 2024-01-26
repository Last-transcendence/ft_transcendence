import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 50,
	height: 50,
	backgroundColor: '#444444',
	border: `2px solid ${theme.palette.background.paper}`,
	position: 'relative',
	':hover': {
		cursor: 'pointer',
		transform: 'scale(1.05)',
		border: '2px solid black',
	},
}));

export default SmallAvatar;
