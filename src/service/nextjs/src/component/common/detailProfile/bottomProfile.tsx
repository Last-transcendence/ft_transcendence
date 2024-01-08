import { Box } from '@mui/material';
import BottomAvatarsGrid from '@/component/common/detailProfile/bottomAvatars';
import { avatarStyle } from '../../profile/common/newAvatar';
import { imgStyle } from '../../profile/common/myImage';
import { useState } from 'react';
import { postFetcher, getFetcher, deleteFetcher } from '@/service/api';
import Chatroom from '@/type/chatroom.type';
import { useRouter } from 'next/router';

const sxStyle: avatarStyle = {
	width: 50,
	height: 50,
	backgroundColor: '#DDDD99',
};

const imageStyle: imgStyle = {
	width: '50%',
	height: '50%',
};

interface BottomProfileProps {
	isFriend: boolean;
	otherUserId: string;
}

const BottomProfile = ({ otherUserId, isFriend }: BottomProfileProps) => {
	const router = useRouter();
	const [isFrd, setIsFrd] = useState<boolean>(isFriend);
	const [loading, setLoading] = useState<boolean>(false);

	const friendAdd = async (): Promise<void> => {
		try {
			const response = await postFetcher('/friend', { friendId: otherUserId });
			setIsFrd(true);
		} catch (error) {
			console.log('친구추가 실패');
		} finally {
			setLoading(false);
		}
	};

	const friendDelete = async (): Promise<void> => {
		try {
			const response = await deleteFetcher(`/friend/${otherUserId}`);
			setIsFrd(false);
		} catch (error) {
			console.log('친구삭제 실패');
		} finally {
			setLoading(false);
		}
	};

	//채팅방 DM 중 원하는 상대가 있는 방을 찾는함수.
	const FindUserFromDm = (userId: string, chatroomList?: Chatroom[]) => {
		if (chatroomList === undefined) {
			return undefined;
		} else {
			return chatroomList.find(item => userId === item.destId);
		}
	};

	const makeNewChatroom = async (otherUserId: string): Promise<string> => {
		const newChatroom: Chatroom = await postFetcher('/chatroom', { destId: otherUserId });
		return newChatroom.id;
	};

	const dmRequest = async (): Promise<void> => {
		try {
			const data: Chatroom[] = await getFetcher('/chatroom');
			const chatroom: Chatroom | undefined = FindUserFromDm(otherUserId, data);
			if (chatroom === undefined) {
				const id = await makeNewChatroom(otherUserId);
				await router.push(`/char/${id}`);
			} else {
				await router.push(`/chat/${chatroom.id}`);
			}
		} catch (error) {
			console.log('dm 생성에 실패 했습니다.');
		} finally {
			setLoading(false);
		}
	};

	const bottomAvatars = [
		{
			image: '/Mail.png',
			name: 'DM',
			sxStyle: sxStyle,
			avatarImgStyle: imageStyle,
			message: 'DM',
			onClick: loading ? undefined : dmRequest,
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
			name: isFrd ? '친구 제거' : '친구 추가',
			sxStyle: sxStyle,
			avatarImgStyle: imageStyle,
			message: isFrd ? '친구 제거' : '친구 추가',
			onClick: loading ? undefined : isFrd ? friendAdd : friendDelete,
		},
	];

	return (
		<Box marginTop="20%">
			<BottomAvatarsGrid avatars={bottomAvatars} />
		</Box>
	);
};

export default BottomProfile;
