import ParticipantList, { PrivateParticipantList } from '@/component/chat/ParticipantList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Participant, ParticipantRole } from '@/type/channel.type';
import AuthContext from '@/context/auth.context';
import useFetchData from '@/hook/useFetchData';
import Chatroom from '@/type/chatroom.type';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';
import SocketContext from '@/context/socket.context';
import useListeningChannelEvent from '@/hook/useListeningChannelEvent';
import { ChannelInfo } from '@/type/channel-info.type';

export const CommonChatRoom = () => {
	const params = useParams<{ id: string }>();
	const { me } = useContext(AuthContext);
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const [channelData, setChannelData] = useState<ChannelInfo | undefined>(undefined);

	//info 정보 받아오기 emit
	useEffect(() => {
		if (!params?.id) return;
		channelSocket?.emit('info', { channelId: params?.id }, (res: any) => {
			console.log(res);
			setChannelData(res);
		});
	}, [params?.id]);

	const myRole = useMemo(() => {
		const myData = channelData?.participant?.find((data: Participant) => data.id === me?.id);
		return myData?.role;
	}, [channelData?.participant, me?.id]);

	const ownerId = useMemo(() => {
		const ownerData = channelData?.participant?.find(
			(data: Participant) => data.role === ParticipantRole.OWNER,
		);
		return ownerData?.id;
	}, [channelData?.participant]);

	const participantDummyData = [
		{
			id: '1',
			nickname: '임시 닉네임',
			profileImageURI: null,
			role: ParticipantRole.ADMIN,
			createdAt: '2021-10-10',
			updatedAt: '2021-10-10',
		},
		{
			id: '2',
			nickname: '임시 닉네임',
			profileImageURI: null,
			role: ParticipantRole.ADMIN,
			createdAt: '2021-10-10',
			updatedAt: '2021-10-10',
		},
		{
			id: '3',
			nickname: '임시 닉네임',
			profileImageURI: null,
			role: ParticipantRole.ADMIN,
			createdAt: '2021-10-10',
			updatedAt: '2021-10-10',
		},
		{
			id: '4',
			nickname: '임시 닉네임',
			profileImageURI: null,
			role: ParticipantRole.ADMIN,
			createdAt: '2021-10-10',
			updatedAt: '2021-10-10',
		},
		{
			id: '5',
			nickname: '임시 닉네임',
			profileImageURI: null,
			role: ParticipantRole.ADMIN,
			createdAt: '2021-10-10',
			updatedAt: '2021-10-10',
		},
	];

	return (
		<ChatRoomLayout
			ownerId={ownerId}
			type={'chat'}
			data={channelData}
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
			<MenuHeader title={channelData?.title ?? ''} type={'chat'}>
				<ParticipantList
					channelId={params?.id}
					participantData={channelData?.participant ?? participantDummyData}
					// myRole={myRole}
					myRole={ParticipantRole.ADMIN}
					isProtected={channelData?.visibility === 'protected'}
					ownerId={ownerId}
					muteList={channelData?.mute ?? []}
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
				<PrivateParticipantList data={data} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};
