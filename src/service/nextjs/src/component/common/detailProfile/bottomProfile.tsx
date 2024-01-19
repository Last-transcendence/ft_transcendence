import { Box } from '@mui/material';
import BottomAvatarsGrid from '@/component/common/detailProfile/bottomAvatars';
import { avatarStyle } from '../../profile/common/newAvatar';
import { imgStyle } from '../../profile/common/myImage';
import { useContext, useState } from 'react';
import { postFetcher, getFetcher, deleteFetcher } from '@/service/api';
import Chatroom from '@/type/chatroom.type';
import { useRouter } from 'next/navigation';
import CustomSnackbar from '../customSnackbar';
import SocketContext from '@/context/socket.context';

const sxStyle: avatarStyle = {
	width: 50,
	height: 50,
	backgroundColor: '#DDDD99',
	isHover: true,
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
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { chatSocket } = useContext(SocketContext).sockets;

	const friendAdd = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await postFetcher('/friend', { friendId: otherUserId });
			setIsFrd(true);
		} catch (error: any) {
			console.log('친구추가 실패');
			setErrorMessage(error.message);
		}
	};

	const friendDelete = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await deleteFetcher(`/friend/${otherUserId}`);
			setIsFrd(false);
		} catch (error: any) {
			console.log('친구삭제 실패');
			setErrorMessage(error.message);
		}
	};

	//채팅방 DM 중 원하는 상대가 있는 방을 찾는함수.
	const findUserFromDm = (userId: string, chatroomList?: Chatroom[]) => {
		if (chatroomList === undefined) {
			return undefined;
		} else {
			return chatroomList.find(item => userId === item.destId);
		}
	};

	const dmRequest = async (): Promise<void> => {
		try {
			setLoading(true);
			// const data: Chatroom[] = await getFetcher('/chatroom');
			// const chatroom: Chatroom | undefined = findUserFromDm(otherUserId, data);
			//@todo dm 접속에 실패할 경우 처리 필요
			chatSocket?.emit('join', { toUserId: otherUserId });
			router.push(`/chat/${otherUserId}/private`);
		} catch (error: any) {
			console.log('dm 생성실패');
			setErrorMessage(error.message);
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

	const handleSnackbarClose = () => {
		setErrorMessage('');
		setLoading(false);
	};

	return (
		<Box marginTop="20%">
			<CustomSnackbar
				open={errorMessage.length !== 0 ? true : false}
				onClose={handleSnackbarClose}
				success={false}
			>
				serverrror : {errorMessage}
			</CustomSnackbar>
			<BottomAvatarsGrid avatars={bottomAvatars} />
		</Box>
	);
};

export default BottomProfile;
