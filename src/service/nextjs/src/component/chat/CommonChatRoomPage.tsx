import ParticipantList from '@/component/chat/ParticipantList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Participant, ParticipantRole } from '@/type/channel.type';
import AuthContext from '@/context/auth.context';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';
import SocketContext from '@/context/socket.context';
import useListeningChannelEvent from '@/hook/useListeningChannelEvent';
import { ChannelInfo } from '@/type/channel-info.type';
import { useRouter } from 'next/router';

export type ChatLiveDataType = {
	type: 'chat' | 'action' | 'help';
	id?: string;
	message?: string;
	me?: boolean;
};

const CommonChatRoomPage = () => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const { me } = useContext(AuthContext);
	const { sockets } = useContext(SocketContext);
	const { channelSocket } = sockets;
	const [channelData, setChannelData] = useState<ChannelInfo | undefined>(undefined);
	const [chatLiveData, setChatLiveData] = useState<ChatLiveDataType[]>([]);
	//채널 입장 메세지 두 번 찍혀서 방지
	const [channelLoading, setChannelLoading] = useState<boolean>(false);
	//채널 정보 받아오기
	useEffect(() => {
		if (!params?.id) return;
		channelSocket?.emit('info', { channelId: params?.id }, (res: any) => {
			console.log(res);
			setChannelData(res);
		});
	}, [params?.id]);

	// @todo participant 처리되면 주석 해제
	useEffect(() => {
		if (!channelData) return;
		// if (channelData.participant?.some((data: Participant) => data.userId === me?.id)) {
		// 	setChatLiveData(prev => [
		// 		...prev,
		// 		{ type: 'action', message: `${channelData?.title} 채널에 입장하셨습니다.` },
		// ]);
		// } else {
		// 	router.push('/');
		// }
		if (channelLoading) return;
		setChatLiveData(prev => [
			...prev,
			{ type: 'action', message: `${channelData?.title} 채널에 입장하셨습니다.` },
		]);
		setChannelLoading(true);
	}, [channelData, me]);

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
			type={'channel'}
			ownerId={ownerId}
			data={channelData}
			chatLiveData={chatLiveData}
			setChatLiveData={setChatLiveData}
		>
			<MenuHeader title={channelData?.title ?? ''} type={'chat'}>
				<ParticipantList
					channelId={params?.id}
					myRole={myRole}
					ownerId={ownerId}
					channelData={channelData}
				/>
			</MenuHeader>
		</ChatRoomLayout>
	);
};

export default CommonChatRoomPage;
