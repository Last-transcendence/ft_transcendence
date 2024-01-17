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

export type ChatLiveDataType = {
	type: 'chat' | 'action' | 'help';
	id?: string;
	message?: string;
};

export const CommonChatRoom = () => {
	const params = useParams<{ id: string }>();
	const { me } = useContext(AuthContext);
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const [channelData, setChannelData] = useState<ChannelInfo | undefined>(undefined);
	const [chatLiveData, setChatLiveData] = useState<ChatLiveDataType[]>([]);

	//info 정보 받아오기 emit
	useEffect(() => {
		if (!params?.id) return;
		channelSocket?.emit('info', { channelId: params?.id }, (res: any) => {
			console.log(res);
			setChannelData(res);
		});
	}, [channelSocket, params?.id]);

	//참여자 나가고 오는 정보 받기
	useListeningChannelEvent('join', (res: any) => {
		console.log(res);
		setChannelData(prev => {
			if (!prev) return prev;
			// 이용자 정보 추가
			return { ...prev, participant: [...prev?.participant, res] };
		});
		setChatLiveData(prev => [
			...prev,
			{ type: 'action', message: `${res?.nickname}님이 들어오셨습니다.` },
		]);
	});

	useListeningChannelEvent('leave', (res: any) => {
		console.log(res);
		setChannelData(prev => {
			if (!prev) return prev;
			// 이용자 정보 제거
			return { ...prev, participant: prev?.participant?.filter(data => data.id !== res?.id) };
		});
		setChatLiveData(prev => [
			...prev,
			{ type: 'action', message: `${res?.nickname}님이 나가셨습니다.` },
		]);
	});

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

	return (
		<ChatRoomLayout
			ownerId={ownerId}
			type={'chat'}
			data={channelData}
			chatLiveData={chatLiveData}
			setChatLiveData={setChatLiveData}
		>
			<MenuHeader title={channelData?.title ?? ''} type={'chat'}>
				<ParticipantList
					channelId={params?.id}
					participantData={channelData?.participant}
					// myRole={myRole}
					myRole={ParticipantRole.ADMIN}
					isProtected={channelData?.visibility === 'PROTECTED'}
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
	const [chatLiveData, setChatLiveData] = useState<ChatLiveDataType[]>([]);

	return (
		<ChatRoomLayout type={'dm'} chatLiveData={chatLiveData} setChatLiveData={setChatLiveData}>
			<MenuHeader title={'채팅'} type={'chat'}>
				<PrivateParticipantList data={data} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};
