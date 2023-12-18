import { Box } from '@mui/material';
import BottomAvatarsGrid from '@/component/profile/bottomAvatars';

const sxStyle = {
	width: 50,
	height: 50,
};

const imageStyle = {
	width: '50%',
	height: '50%',
};

const BottomProfile = () => {
	const bottomAvatars = [
		{
			image: '/Mail.png',
			altText: 'DM',
			sxStyle: sxStyle,
			imageStyle: imageStyle,
			message: 'DM',
		},
		{
			image: '/Add User Male.png',
			altText: '1:1 게임',
			sxStyle: sxStyle,
			imageStyle: imageStyle,
			message: '1:1 게임',
		},
		{
			image: '/Ping Pong.png',
			altText: '친구 추가 제거',
			sxStyle: sxStyle,
			imageStyle: imageStyle,
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
