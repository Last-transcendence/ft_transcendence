import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import ProfileModar from '@/component/common/detailProfile/profileModar';
import ProfileMenus from '@/component/common/detailProfile/profileMenus';
import ProfilePageBody from '@/component/common/detailProfile/profilePageBody';
import Block from '@/type/block.type';
import User from '@/type/user.type';
import { useRouter } from 'next/router';
import { getFetcher } from '@/service/api';
import CustomSnackbar from '@/component/common/customSnackbar';

interface OpenProfileAvatarProps {
	isMe: boolean;
	otherUserId: string;
	friendList: string[];
}

export interface otherUser {
	img: string;
	name: string;
	state: string;
	isFriend: boolean;
}

const OpenProfileAvatar = ({ isMe, otherUserId, friendList }: OpenProfileAvatarProps) => {
	const router = useRouter();

	const [otherUserData, setOtherUserData] = useState<otherUser>({
		img: '',
		name: '',
		state: '',
		isFriend: false,
	});
	const [isBlockUser, setIsBlockUser] = useState<Boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const blockList = await getFetcher<Block[]>('/block');
	// 			const data = await getFetcher<User>(`/user/${otherUserId}`);
	// 			setOtherUserData({
	// 				img: data.profileImageURI,
	// 				name: data.nickname,
	// 				state: data.status,
	// 				isFriend: friendList.includes(data.nickname),
	// 			});
	// 			setIsBlockUser(blockList.some((blockedUser) => blockedUser.id === otherUserId));
	// 		} catch (error) {
	// 			setErrorMessage(error.message);
	// 		}
	// 	};

	// 	fetchData();
	// }, [otherUserId, friendList]);

	const [click, setClick] = useState(false);

	const handleAvatarOpen = () => {
		if (isMe === true) {
			router.push('/profile/testDetailProfile');
		} else {
			setClick(true);
		}
	};


	const handleSnackbarClose = () => {
		setErrorMessage('');
	}

	return (
		<>
			<CustomSnackbar open={errorMessage !== '' ? true : false} onClose={handleSnackbarClose} success={false}>
				{errorMessage}
			</CustomSnackbar>
			<Avatar alt="User Avatar" onClick={handleAvatarOpen} />
			{click && (
				<ProfileModar setClick={setClick} childMenu={<ProfileMenus/>}>
					<ProfilePageBody otherUserId={otherUserId} {...otherUserData} />
				</ProfileModar>
			)}
		</>
	);
};

export default OpenProfileAvatar;
