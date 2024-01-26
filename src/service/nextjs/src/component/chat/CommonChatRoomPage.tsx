import ParticipantList from '@/component/chat/ParticipantList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AdminActionType, Participant, ParticipantRole } from '@/type/channel.type';
import AuthContext from '@/context/auth.context';
import ChatRoomLayout from '@/component/chat/ChatRoomLayout';
import SocketContext from '@/context/socket.context';
import useListeningChannelEvent from '@/hook/useListeningChannelEvent';
import { ChannelInfo } from '@/type/channel-info.type';
import { useRouter } from 'next/router';
import CustomConfirmModal from '../common/CustomConfirmModal';

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
	const [inviteResponse, setInviteResponse] = useState<{
		channelId: string;
		userId: string;
		nickname: string;
		mode: 'NORMAL' | 'HARD';
	} | null>(null);
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const getChannelInfo = useCallback(() => {
		if (!params?.id) return;
		channelSocket?.emit('info', { channelId: params?.id }, (res: any) => {
			// console.log('info res', res);
			setChannelData(res);
		});
	}, [channelSocket, params?.id]);

	useEffect(() => {
		if (!params?.id) return;
		getChannelInfo();
	}, [channelSocket, params?.id]);

	useEffect(() => {
		if (!params?.id) return;
		getChannelInfo();
	}, [channelSocket, params?.id]);

	useEffect(() => {
		if (!channelData) return;
		if (channelData.participant?.some((data: Participant) => data.userId === me?.id)) {
			if (channelLoading) return;
			setChatLiveData(prev => [
				...prev,
				{ type: 'action', message: `${channelData?.title} 채널에 입장하셨습니다.` },
				{ type: 'help' },
			]);
			setChannelLoading(true);
		} else {
			alert('채널에 참여하고 있지 않습니다.');
			router.push('/');
		}
	}, [channelData, me]);

	const getNickname = useCallback(
		(userId: string) => {
			const participant: Participant | undefined = channelData?.participant?.find(
				data => data.userId === userId,
			);
			return participant?.user?.nickname;
		},
		[channelData?.participant],
	);

	const setActionMessage = useCallback((message: string) => {
		setChatLiveData(prev => [...prev, { type: 'action', message }]);
	}, []);

	// const removeParticipant = useCallback((userId: string) => {
	// 	console.log('userId');
	// 	getChannelInfo();
	// 	// setChannelData(prev => {
	// 	// 	if (!prev) return prev;
	// 	// 	return { ...prev, participant: prev?.participant?.filter(data => data.id !== userId) };
	// 	// });
	// }, []);

	//이용자 참여
	useListeningChannelEvent('join', (res: any) => {
		// console.log('join listen res', res);
		setActionMessage(`${res?.nickname}님이 들어오셨습니다.`);
		getChannelInfo();
		// setChannelData(prev => {
		// 	if (!prev) return prev;
		// 	if (prev?.participant?.some(data => data.id === res?.userId)) return prev;
		// 	return {
		// 		...prev,
		// 		participant: [
		// 			...prev?.participant,
		// 			{ ...res, userId: res?.userId, role: ParticipantRole.USER, user: res },
		// 		],
		// 	};
		// });
	});

	//이용자 퇴장
	useListeningChannelEvent('leave', (res: any) => {
		// console.log('listen leave', res);
		setActionMessage(`${res?.nickname}님이 나가셨습니다.`);
		getChannelInfo();
	});

	const responseInvite = useCallback(
		(inviteResponse: any, response: 'ACCEPT' | 'REJECT') => {
			channelSocket?.emit('invite/response', { ...inviteResponse, response }, (res: any) => {
				// console.log(res);
			});
		},
		[channelSocket],
	);

	const adminAction = useCallback(
		(action: AdminActionType, nickname: string) => {
			if (action === 'setting') return getChannelInfo();
			if (!nickname) return;
			switch (action) {
				case 'kick':
					setActionMessage(`${nickname}님이 킥되었습니다.`);
					// removeParticipant(id);
					getChannelInfo();
					break;
				case 'ban':
					setActionMessage(`${nickname}님이 밴되었습니다.`);
					getChannelInfo();
					// removeParticipant(id);
					break;
				case 'mute':
					setActionMessage(`${nickname}님이 뮤트되었습니다.`);
					getChannelInfo();
					// setChannelData((prev: ChannelInfo | undefined): ChannelInfo | undefined => {
					// 	if (!prev || !prev?.mute) return prev;
					// 	return { ...prev, mute: [...prev?.mute, { userId: id }] };
					// });
					break;
				case 'admin':
					setActionMessage(`${nickname}님이 어드민으로 임명되었습니다.`);
					getChannelInfo();
					// setChannelData((prev: ChannelInfo | undefined) => {
					// 	if (!prev) return prev;
					// 	return {
					// 		...prev,
					// 		participant: prev?.participant?.map((data: Participant) => {
					// 			if (data.userId === id) return { ...data, role: ParticipantRole.ADMIN };
					// 			return data;
					// 		}),
					// 	};
					// });
					break;
				default:
					break;
			}
		},
		[getChannelInfo, setActionMessage],
	);

	// 이용자 게임 초대
	useListeningChannelEvent('invite', (res: any) => {
		// console.log('invite game listen', res);
		setIsOpened(true);
		setInviteResponse(res);
	});

	// 이용자 게임 초대 후 매치 성공
	useListeningChannelEvent('invite/matched', (res: any) => {
		router.push(`/game?gameRoomId=${res?.room}`);
	});

	//이용자 뮤트
	useListeningChannelEvent('mute', (res: any) => {
		if (res?.userId === me?.id) {
			alert('채널에서 뮤트되었습니다.');
		}
		adminAction('mute', res?.nickname);
	});

	//이용자 차단
	useListeningChannelEvent('ban', (res: any) => {
		if (res?.userId === me?.id) {
			alert('채널에서 밴되었습니다.');
			router.push('/');
		}
		adminAction('ban', res?.nickname);
	});

	//이용자 킥
	useListeningChannelEvent('kick', (res: any) => {
		// console.log('kick listen', res);
		if (res?.userId === me?.id) {
			alert('채널에서 킥되었습니다.');
			router.push('/');
		}
		adminAction('kick', res?.nickname);
	});

	//이용자 어드민 임명
	useListeningChannelEvent('role', (res: { userId: string; nickname: string }) => {
		// console.log('role res', res);
		if (res?.userId === me?.id) {
			alert('채널 어드민으로 임명되었습니다.');
		}
		adminAction('admin', res?.nickname);
	});

	const myRole = useMemo(() => {
		const myData = channelData?.participant?.find((data: Participant) => data.userId === me?.id);
		return myData?.role;
	}, [channelData?.participant, me?.id]);

	const ownerId = useMemo(() => {
		const ownerData = channelData?.participant?.find(
			(data: Participant) => data.role === ParticipantRole.OWNER,
		);
		return ownerData?.userId;
	}, [channelData?.participant]);

	return (
		<>
			<ChatRoomLayout
				type={'channel'}
				ownerId={ownerId}
				data={channelData}
				chatLiveData={chatLiveData}
				setChatLiveData={setChatLiveData}
				adminAction={adminAction}
			>
				<MenuHeader title={channelData?.title ?? ''} type={'chat'}>
					<ParticipantList
						channelId={params?.id}
						myRole={myRole as ParticipantRole}
						ownerId={ownerId}
						channelData={channelData}
						adminAction={adminAction}
					/>
				</MenuHeader>
			</ChatRoomLayout>
			{isOpened && (
				<CustomConfirmModal
					setIsOpened={setIsOpened}
					title={`${inviteResponse?.nickname}님이 ${inviteResponse?.mode}게임에 초대하셨습니다.`}
					content="수락하시겠습니까?"
					onConfirm={() => {
						responseInvite(inviteResponse, 'ACCEPT');
					}}
					onCancel={() => {
						responseInvite(inviteResponse, 'REJECT');
					}}
				/>
			)}
		</>
	);
};

export default CommonChatRoomPage;
