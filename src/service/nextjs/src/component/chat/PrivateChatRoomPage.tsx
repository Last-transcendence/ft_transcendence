import { useParams } from 'next/navigation';
import useFetchData from '@/hook/useFetchData';
import { useEffect, useMemo, useState } from 'react';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';
import { MenuHeader } from '@/component/common/Header';
import PrivateParticipantList from '@/component/chat/PrivateParticipantList';
import { ChatLiveDataType } from '@/component/chat/CommonChatRoomPage';
import User from '@/type/user.type';
import Chatroom from '@/type/chatroom.type';

interface IChat {
	id: string;
	chatRoomId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

const PrivateChatRoomPage = () => {
	const params = useParams<{ id: string }>();
	const { data: otherUserData } = useFetchData<User>(params?.id ? `/user/${params?.id}` : null);
	const { data: chatData } = useFetchData<IChat[]>(params?.id ? `/chat?destId=${params.id}` : null);
	const [chatLiveData, setChatLiveData] = useState<ChatLiveDataType[]>([]);
	const { data: chatRoomList } = useFetchData<Chatroom[]>('/chatroom');

	const chatRoomData = useMemo(() => {
		if (!chatRoomList) return;
		return chatRoomList?.find(data => data?.destId === params?.id || data?.srcId === params?.id);
	}, [chatRoomList, params?.id]);

	//@todo chatData를 기본데이터로 세팅
	useEffect(() => {
		if (!chatData) return;
		if (!chatRoomData) return;
		setChatLiveData(
			chatData?.map(data => ({
				type: 'chat',
				id: data?.chatRoomId === chatRoomData?.id ? chatRoomData?.srcId : chatRoomData?.destId,
				message: data?.content,
			})),
		);
	}, [chatData, chatRoomData, chatRoomData?.destId, chatRoomData?.id, chatRoomData?.srcId]);

	return (
		<ChatRoomLayout
			chatLiveData={chatLiveData}
			setChatLiveData={setChatLiveData}
			type={'chatroom'}
			otherUserData={otherUserData}
		>
			<MenuHeader title={'채팅'} type={'chat'}>
				<PrivateParticipantList otherUserData={otherUserData} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};

export default PrivateChatRoomPage;
