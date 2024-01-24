import NewIcon from '../common/newIcon';
import { NewIconProps } from '../common/newIcon';
import { avatarStyle } from '../common/newAvatar';

const sxStyle: avatarStyle = {
	width: 150,
	height: 150,
};

const ProfileAvartar = ({ ...ar }: NewIconProps) => (
	<div>
		<NewIcon {...ar} sxStyle={sxStyle} />
	</div>
);

export default ProfileAvartar;
