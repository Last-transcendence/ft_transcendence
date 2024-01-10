import Avatar from '@mui/material/Avatar';
import { useState, useEffect, useContext } from 'react';
import ProfileModar from '@/component/common/detailProfile/profileModar';
import ProfileMenus from '@/component/common/detailProfile/profileMenus';
import ProfilePageBody from '@/component/common/detailProfile/profilePageBody';
import { useRouter } from 'next/router';
import { getFetcher } from '@/service/api';
import AuthContext from '@/context/auth.context';
import getFriend from '@/service/getFriend';

interface OpenProfileAvatarProps {
	otherUserId: string;
}

export interface otherUser {
	img: string;
	name: string;
	state: string;
	isFriend: boolean;
}

const OpenProfileAvatar = ({ otherUserId }: OpenProfileAvatarProps) => {
	const router = useRouter();
	const { me } = useContext(AuthContext);
	const isMe = me?.id ? me.id === otherUserId : false;
	const friendList = getFriend();

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

	const handleAvatarOpen = () => {
		if (isMe) {
			router.push('/profile/testDetailProfile');
		} else {
			setClick(true);
		}
	};

	return (
		<>
			<Avatar alt="User Avatar" onClick={handleAvatarOpen} sx={{ cursor: 'pointer' }} />
			{click && (
				<ProfileModar setClick={setClick} childMenu={<ProfileMenus />}>
					<ProfilePageBody otherUserId={otherUserId} {...otherUserData} />
				</ProfileModar>
			)}
		</>
	);
};

export default OpenProfileAvatar;
