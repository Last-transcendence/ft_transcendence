import NewIcon from '../common/newIcon';
import { NewIconProps } from '../common/newIcon';
import { avatarStyle } from '../common/newAvatar';
import { imgStyle } from '../common/myImage';

const sxStyle: avatarStyle = {
	width: 150,
	height: 150,
};

const imgStyle: imgStyle = {
	width: '100%',
	height: '100%',
};

const ProfileAvartar = ({ ...ar }: NewIconProps) => (
	<div>
		<NewIcon {...ar} sxStyle={sxStyle} avatarImgStyle={imgStyle} />
	</div>
);

export default ProfileAvartar;
