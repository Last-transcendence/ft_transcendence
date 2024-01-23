import { Box } from '@mui/material';
import BottomAvatarsGrid from '@/component/common/detailProfile/bottomAvatars';
import { avatarStyle } from '../../profile/common/newAvatar';
import { useState, Dispatch, SetStateAction, useContext } from 'react';
import { postFetcher, getFetcher, deleteFetcher } from '@/service/api';
import Chatroom from '@/type/chatroom.type';
import { useRouter } from 'next/navigation';
import CustomSnackbar from '../customSnackbar';
import SocketContext from '@/context/socket.context';

const sxStyle: avatarStyle = {
	backgroundColor: '#DDDD99',
	isHover: true,
};

interface BottomProfileProps {
	isFriend?: boolean;
	setIsFriend: Dispatch<SetStateAction<boolean | undefined>>;
	otherUserId: string;
	refetch?: () => void;
}

const BottomProfile = ({ otherUserId, isFriend, setIsFriend, refetch }: BottomProfileProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { chatSocket } = useContext(SocketContext).sockets;

	const friendAdd = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await postFetcher('/friend', { friendId: otherUserId });
			if (refetch !== undefined) refetch();
			setIsFriend(true);
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const friendDelete = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await deleteFetcher(`/friend/${otherUserId}`);
			if (refetch !== undefined) refetch();
			setIsFriend(false);
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
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

	const makeNewChatroom = async (otherUserId: string): Promise<string> => {
		try {
			const newChatroom = await postFetcher<Chatroom>('/chatroom', { destId: otherUserId });
			return newChatroom.destId;
		} finally {
		}
	};

	const dmRequest = async (): Promise<void> => {
		try {
			setLoading(true);
			// const data: Chatroom[] = await getFetcher<Chatroom[]>('/chatroom');
			// const chatroom: Chatroom | undefined = findUserFromDm(otherUserId, data);
			// if (chatroom === undefined) {
			//	const id = await makeNewChatroom(otherUserId);
			// }
			//@todo dm 접속에 실패할 경우 처리 필요
			chatSocket?.emit('join', { destId: otherUserId }, (res: any) => {
				console.log('res', res);
			});
			router.push(`/chat/${otherUserId}/private`);
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const bottomAvatars = [
		{
			image: '/Mail.png',
			name: 'DM',
			sxStyle: sxStyle,
			avatarImgStyle: undefined,
			message: 'DM',
			onClick: loading ? undefined : dmRequest,
		},
		{
			image: '/Add User Male.png',
			name: '1:1 게임',
			sxStyle: sxStyle,
			avatarImgStyle: undefined,
			message: '1:1 게임',
		},
		{
			image: '/Ping Pong.png',
			name: isFriend ? '친구 제거' : '친구 추가',
			sxStyle: sxStyle,
			avatarImgStyle: undefined,
			message: isFriend ? '친구 제거' : '친구 추가',
			onClick: loading ? undefined : isFriend ? friendDelete : friendAdd,
		},
	];

	const handleSnackbarClose = () => {
		setErrorMessage('');
		setLoading(false);
	};

	return isFriend === undefined ? (
		<div></div>
	) : (
		<Box marginTop="20%">
			<CustomSnackbar
				open={errorMessage.length !== 0 ? true : false}
				onClose={handleSnackbarClose}
				success={false}
			>
				{errorMessage}
			</CustomSnackbar>
			<BottomAvatarsGrid avatars={bottomAvatars} />
		</Box>
	);
};

export default BottomProfile;
