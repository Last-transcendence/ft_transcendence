import NewIcon, { NewIconProps } from '../common/NewIcon';
import { avatarStyle } from '../common/NewAvatar';

const sxStyle: avatarStyle = {
	width: 150,
	height: 150,
};

const ProfileAvatar = ({ ...ar }: NewIconProps) => (
	<div>
		<NewIcon {...ar} sxStyle={sxStyle} />
	</div>
);

export default ProfileAvatar;
