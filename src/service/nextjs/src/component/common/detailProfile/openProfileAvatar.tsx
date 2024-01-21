import Avatar from '@mui/material/Avatar';
import { useState, useContext, useEffect } from 'react';
import ProfileModar from '@/component/common/detailProfile/profileModar';
import ProfileMenus from '@/component/common/detailProfile/profileMenus';
import ProfilePageBody from '@/component/common/detailProfile/profilePageBody';
import Block from '@/type/block.type';
import User from '@/type/user.type';
import { useRouter } from 'next/navigation';
import { getFetcher } from '@/service/api';
import AuthContext from '@/context/auth.context';
import getFriend from '@/service/getFriend';

interface OpenProfileAvatarProps {
	otherUserId: string;
	imgUrl: string | undefined | null;
}

export interface otherUser {
	img: string | undefined;
	name: string;
	state: string;
	isFriend: boolean;
}

const OpenProfileAvatar = ({ otherUserId, imgUrl }: OpenProfileAvatarProps) => {
	const router = useRouter();
	const { me } = useContext(AuthContext);
	const isMe = me?.id ? me.id === otherUserId : false;

	const [otherUserData, setOtherUserData] = useState<otherUser>({
		img: '',
		name: '',
		state: '',
		isFriend: false,
	});
	const [isBlockUser, setIsBlockUser] = useState<Boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [click, setClick] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const friendList = await getFriend();
				const blockList = await getFetcher<Block[]>('/block');
				const data = await getFetcher<User>(`/user/${otherUserId}`);
				setOtherUserData({
					img: data?.profileImageURI,
					name: data?.nickname,
					state: data?.status,
					isFriend: friendList?.some(friend => friend.id === otherUserId),
				});
				setIsBlockUser(blockList.some(blockedUser => blockedUser.id === otherUserId));
			} catch (error) {
				setErrorMessage('error');
			}
		};
		if (click) {
			fetchData();
		}
	}, [otherUserId, click]);

	const handleAvatarOpen = () => {
		if (isMe) {
			router.push('/profile/myProfile');
		} else {
			setClick(true);
		}
	};

	const handleSnackbarClose = () => {
		setErrorMessage('');
	};

	return (
		<>
			<Avatar
				alt="User Avatar"
				onClick={handleAvatarOpen}
				sx={{ cursor: 'pointer', width: 36, height: 36 }}
				src={imgUrl ? imgUrl : undefined}
			/>
			{click && (
				<ProfileModar setClick={setClick} childMenu={<ProfileMenus />}>
					<ProfilePageBody otherUserId={otherUserId} {...otherUserData} />
				</ProfileModar>
			)}
		</>
	);
};

export default OpenProfileAvatar;
