import { useParams } from 'next/navigation';
import useFetchData from '@/hook/useFetchData';
import Chatroom from '@/type/chatroom.type';
import { useEffect, useState } from 'react';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';
import { MenuHeader } from '@/component/common/Header';
import PrivateParticipantList from '@/component/chat/PrivateParticipantList';
import { ChatLiveDataType } from '@/component/chat/CommonChatRoomPage';

const PrivateChatRoomPage = () => {
	const params = useParams<{ id: string }>();
	//chat 기록 받아오기
	const { data: chatData } = useFetchData<any[]>(`/chatroom/chat?destId=${params?.id}`);
	const [chatLiveData, setChatLiveData] = useState<ChatLiveDataType[]>([]);

	useEffect(() => {
		if (!chatData) return;
		setChatLiveData(
			chatData.map(data => ({
				type: 'chat',
				id: data?.userId,
				message: data?.message,
			})),
		);
	}, [chatData]);

	return (
		<ChatRoomLayout chatLiveData={chatLiveData} setChatLiveData={setChatLiveData} type={'chatroom'}>
			<MenuHeader title={'채팅'} type={'chat'}>
				<PrivateParticipantList id={params?.id} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};

export default PrivateChatRoomPage;
