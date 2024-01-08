import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import ProfileModar from '@/component/common/detailProfile/profileModar';
import ProfileMenus from '@/component/common/detailProfile/profileMenus';
import ProfilePageBody from '@/component/common/detailProfile/profilePageBody';
import { useRouter } from 'next/router';
import { getFetcher } from '@/service/api';

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

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const data = await getFetcher(`/user/${otherUserId}`);
	// 			setOtherUserData({
	// 				img: data.profileImageURI,
	// 				name: data.nickname,
	// 				state: data.status,
	// 				isFriend: friendList.includes(data.nickname),
	// 			});
	// 		} catch (error) {
	// 			console.log('서버에서 값 받아오는 중 에러');
	// 		}
	// 	};

	// 	fetchData();
	// }, [otherUserId, friendList]);

	const [click, setClick] = useState(false);

	const handleAvatarClick = () => {
		setClick(true);
	};

	useEffect(() => {
		if (click == true && isMe === true) {
			router.push('/profile/testDetailProfile');
		}
	}, [click, isMe, router]);

	return (
		<>
			<Avatar alt="User Avatar" onClick={handleAvatarClick} />
			{click && isMe === false && (
				<ProfileModar setClick={setClick} childMenu={<ProfileMenus />}>
					<ProfilePageBody otherUserId={otherUserId} {...otherUserData} />
				</ProfileModar>
			)}
		</>
	);
};

export default OpenProfileAvatar;
