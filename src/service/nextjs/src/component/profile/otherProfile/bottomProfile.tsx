import { Box } from '@mui/material';
import BottomAvatarsGrid from '@/component/profile/otherProfile/bottomAvatars';
import { avatarStyle } from '../common/newAvatar';
import { imgStyle } from '../common/myImage';

const sxStyle: avatarStyle = {
	width: 50,
	height: 50,
	backgroundColor: '#DDDD99',
};

const imageStyle: imgStyle = {
	width: '50%',
	height: '50%',
};

const BottomProfile = () => {
	const bottomAvatars = [
		{
			image: '/Mail.png',
			name: 'DM',
			sxStyle: sxStyle,
			avatarImgStyle: imageStyle,
			message: 'DM',
		},
		{
			image: '/Add User Male.png',
			name: '1:1 게임',
			sxStyle: sxStyle,
			avatarImgStyle: imageStyle,
			message: '1:1 게임',
		},
		{
			image: '/Ping Pong.png',
			name: '친구 추가 제거',
			sxStyle: sxStyle,
			avatarImgStyle: imageStyle,
			message: '친구 추가 제거',
		},
	];

	return (
		<Box marginTop="20%">
			<BottomAvatarsGrid avatars={bottomAvatars} />
		</Box>
	);
};

export default BottomProfile;
