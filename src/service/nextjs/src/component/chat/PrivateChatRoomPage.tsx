import { useParams } from 'next/navigation';
import useFetchData from '@/hook/useFetchData';
import Chatroom from '@/type/chatroom.type';
import { useEffect, useState } from 'react';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';
import { MenuHeader } from '@/component/common/Header';
import { PrivateParticipantList } from '@/component/chat/ParticipantList';
import { ChatLiveDataType } from '@/component/chat/CommonChatRoomPage';

const PrivateChatRoomPage = () => {
	const params = useParams<{ id: string }>();
	//chat room 정보 받아오기
	const { data, isLoading } = useFetchData<Chatroom[]>(`/chatroom/${params?.id}`);
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
	}, []);

	return (
		<ChatRoomLayout chatLiveData={chatLiveData} setChatLiveData={setChatLiveData}>
			<MenuHeader title={'채팅'} type={'chat'}>
				<PrivateParticipantList data={data} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};

export default PrivateChatRoomPage;
