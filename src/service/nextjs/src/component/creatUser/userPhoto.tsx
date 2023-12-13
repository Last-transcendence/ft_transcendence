import { Badge } from '@mui/material';
import SmallAvatar from './smallAvatar';
import BigAvatar from './bigAvatar';

const UserPhoto = () => {
	return (
		<Badge
			overlap="circular"
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeContent={<SmallAvatar alt="add img" src="" />}
		>
			<BigAvatar alt="person img" src="../public/next.svg" />
		</Badge>
	);
};

export default UserPhoto;
