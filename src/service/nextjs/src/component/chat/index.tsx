import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import SendChat from '@/component/chat/SendChat';
import ParticipantList, { PrivateParticipantList } from '@/component/chat/ParticipantList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Participant, ParticipantRole } from '@/type/channel.type';
import AuthContext from '@/context/auth.context';
import useFetchData from '@/hook/useFetchData';
import Chatroom from '@/type/chatroom.type';

export type CommandType = 'DM' | 'INVITE' | 'GAME' | 'HELP';
interface ChatRoomLayoutProps {
	type: 'chat' | 'dm';
	children: ReactNode;
	myRole?: ParticipantRole;
	chatRoomData?: Chatroom[] | null;
}

const ChatRoomLayout = ({ type, children, myRole, chatRoomData }: ChatRoomLayoutProps) => {
	const params = useParams<{ id: string }>();
	// 실시간으로 보여질 채팅 데이터
	const [chatLiveData, setChatLiveData] = useState<any[]>([
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
	]);

	const sendAction = (message: string) => {
		if (message === '') return;
		alert(message);
	};

	const commandAction = (type: CommandType, nickname?: string, message?: string) => {
		switch (type) {
			case 'HELP':
				alert('HELP');
				setChatLiveData(prev => [...prev, { type: 'help' }]);
				break;
			case 'DM':
				alert('DM');
				// send DM invite (nickname, message)
				break;
			case 'INVITE':
				alert('INVITE');
				// invite
				break;
			case 'GAME':
				alert('GAME');
				// game invite
				break;
			default:
				break;
		}
	};

	return (
		<Stack width={'100%'} height={'100%'}>
			{/*헤더 영역*/}
			<div>{children}</div>
			{/*채팅 영역*/}
			{/*@todo 소켓 데이터 구조에 맞게 바꾸기, 소켓에 유저 id가 올까?*/}
			<Stack padding={2} spacing={2} sx={{ overflowY: 'scroll' }} height={'100%'}>
				{chatLiveData?.map((data: any, index: number) =>
					data.type === 'chat' ? (
						<ChatMsg
							userId={''}
							nickname={'닉네임'}
							key={index}
							myRole={type === 'chat' ? ParticipantRole.ADMIN : undefined}
							channelId={params?.id}
						/>
					) : data.type === 'help' ? (
						<HelpMsg />
					) : (
						<StatusMsg content={data?.content} />
					),
				)}
			</Stack>
			<SendChat sendAction={sendAction} commandAction={commandAction} />
		</Stack>
	);
};

export const CommonChatRoom = () => {
	const params = useParams<{ id: string }>();
	const { me } = useContext(AuthContext);
	const {
		data: participantData,
		isLoading: isParticipantLoading,
		error: participantError,
	} = useFetchData<Participant[]>(`/channel/${params?.id}/participant`);

	const myRole = useMemo(() => {
		const myData = participantData?.find((data: Participant) => data.id === me?.id);
		return myData?.role;
	}, [me?.id, participantData]);

	return (
		<ChatRoomLayout type={'chat'}>
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

//@todo 기존 dm 내용 불러오기
// 		const res = await getFetcher(`/chatroom/chat?destId=${id}`);
export const PrivateChatRoom = () => {
	const params = useParams<{ id: string }>();
	const { data, isLoading } = useFetchData<Chatroom[]>(`/chatroom/${params?.id}`);

	return (
		<ChatRoomLayout type={'chat'} chatRoomData={data}>
			<MenuHeader title={'채팅'} type={'chat'}>
				<PrivateParticipantList data={data} isLoading={isLoading} />
			</MenuHeader>
		</ChatRoomLayout>
	);
};
