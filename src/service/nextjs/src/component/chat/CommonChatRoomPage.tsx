import ParticipantList, { PrivateParticipantList } from '@/component/chat/ParticipantList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

const CommonChatRoomPage = () => {
	const params = useParams<{ id: string }>();
	const { me } = useContext(AuthContext);
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const [channelData, setChannelData] = useState<ChannelInfo | undefined>(undefined);
	const [chatLiveData, setChatLiveData] = useState<ChatLiveDataType[]>([]);

	//채널 정보 받아오기
	useEffect(() => {
		if (!params?.id) return;
		channelSocket?.emit('info', { channelId: params?.id }, (res: any) => {
			console.log(res);
			setChannelData(res);
		});
	}, [channelSocket, params?.id]);

	const setActionMessage = useCallback((message: string) => {
		setChatLiveData(prev => [...prev, { type: 'action', message }]);
	}, []);

	const removeParticipant = useCallback((userId: string) => {
		setChannelData(prev => {
			if (!prev) return prev;
			return { ...prev, participant: prev?.participant?.filter(data => data.id !== userId) };
		});
	}, []);

	//이용자 참여
	useListeningChannelEvent('join', (res: any) => {
		console.log(res);
		setChannelData(prev => {
			if (!prev) return prev;
			return { ...prev, participant: [...prev?.participant, res] };
		});
		setActionMessage(`${res?.nickname}님이 들어오셨습니다.`);
	});

	//이용자 퇴장
	useListeningChannelEvent('leave', (res: any) => {
		console.log(res);
		removeParticipant(res?.id);
		setActionMessage(`${res?.nickname}님이 나가셨습니다.`);
	});

	//이용자 뮤트
	useListeningChannelEvent('mute', (res: any) => {
		console.log(res);
		setChannelData(prev => {
			if (!prev) return prev;
			return { ...prev, mute: [...prev?.mute, res?.id] };
		});
		setActionMessage(`${res?.nickname}님이 뮤트되었습니다.`);
	});

	//이용자 차단
	useListeningChannelEvent('ban', (res: any) => {
		console.log(res);
		removeParticipant(res?.id);
		setActionMessage(`${res?.nickname}님이 밴되었습니다.`);
	});

	useListeningChannelEvent('kick', (res: any) => {
		console.log(res);
		removeParticipant(res?.id);
		setActionMessage(`${res?.nickname}님이 킥되었습니다.`);
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

export default CommonChatRoomPage;