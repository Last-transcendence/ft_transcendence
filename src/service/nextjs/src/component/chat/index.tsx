import ParticipantList, { PrivateParticipantList } from '@/component/chat/ParticipantList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { Participant, ParticipantRole } from '@/type/channel.type';
import AuthContext from '@/context/auth.context';
import useFetchData from '@/hook/useFetchData';
import Chatroom from '@/type/chatroom.type';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';

export const CommonChatRoom = () => {
	const params = useParams<{ id: string }>();
	const { me } = useContext(AuthContext);
	const { data: participantData, isLoading: isParticipantLoading } = useFetchData<Participant[]>(
		`/channel/${params?.id}/participant`,
	);

	const myRole = useMemo(() => {
		const myData = participantData?.find((data: Participant) => data.id === me?.id);
		return myData?.role;
	}, [me?.id, participantData]);

	return (
		<ChatRoomLayout
			type={'chat'}
			chatRoomData={[
				{
					type: 'chat',
					content: {
						id: '1',
						userId: '1',
						nickname: '임시 닉네임',
						profileImageURI: null,
						content: '테스트 메세지',
						createdAt: '2021-10-10',
						updatedAt: '2021-10-10',
					},
				},
				{
					type: 'help',
				},
				{ type: 'action', content: '님이 입장하셨습니다' },
			]}
		>
			<MenuHeader title={'채팅'} type={'chat'}>
				<ParticipantList
					channelId={params?.id}
					participantData={participantData}
					isParticipantLoading={isParticipantLoading}
					// myRole={myRole}
					myRole={ParticipantRole.ADMIN}
				/>
			</MenuHeader>
		</ChatRoomLayout>
	);
};

export const PrivateChatRoom = () => {
	const params = useParams<{ id: string }>();
	const { data, isLoading } = useFetchData<Chatroom[]>(`/chatroom/${params?.id}`);
	const { data: chatData } = useFetchData<any[]>(`/chatroom/chat?destId=${params?.id}`);

	return (
		<ChatRoomLayout type={'dm'} chatRoomData={chatData}>
			<MenuHeader title={'채팅'} type={'chat'}>
				<PrivateParticipantList data={data} isLoading={isLoading} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};
