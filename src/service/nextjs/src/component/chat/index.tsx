import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import SendChat from '@/component/chat/SendChat';
import ChattingListPage from '@/component/chat/ChatList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Participant, ParticipantRole } from '@/type/channel.type';
import { getFetcher } from '@/component/api/getFetcher';
import AuthContext from '@/context/auth.context';

export type CommandType = 'DM' | 'INVITE' | 'GAME' | 'HELP';
export const CommonChatRoom = () => {
	const params = useParams<{ id: string }>();
	const [participantData, setParticipantData] = useState<any[]>([]);
	const [isParticipantLoading, setParticipantLoading] = useState(false);
	const { me } = useContext(AuthContext);
	// 실시간으로 보여질 채팅 데이터
	const [chatLiveData, setChatLiveData] = useState<any[]>([]);

	const fetchData = async () => {
		try {
			setParticipantLoading(true);
			const res: Participant[] = await getFetcher(`/channel/${params?.id}/participant`);
			setParticipantData(res);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setParticipantLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		setChatLiveData([
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
	}, []);

	const myRole = useMemo(() => {
		const myData = participantData.find((data: Participant) => data.id === me?.id);
		return myData?.role;
	}, [me?.id, participantData]);

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
			<MenuHeader title={'채팅'} type={'chat'}>
				<ChattingListPage
					channelId={params?.id}
					participantData={participantData}
					isParticipantLoading={isParticipantLoading}
					// myRole={myRole}
					myRole={ParticipantRole.ADMIN}
				/>
			</MenuHeader>
			{/*채팅 영역*/}
			{/*@todo 소켓 데이터 구조에 맞게 바꾸기, 소켓에 유저 id가 올까?*/}
			<Stack padding={2} spacing={2} sx={{ overflowY: 'scroll' }} height={'100%'}>
				{chatLiveData?.map((data: any, index: number) =>
					data.type === 'chat' ? (
						<ChatMsg
							userId={''}
							nickname={'닉네임'}
							key={index}
							myRole={ParticipantRole.ADMIN}
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

//@todo 기존 dm 내용 불러오기
export const PrivateChatRoom = () => {
	const params = useParams<{ id: string }>();
	//@todo api test
	// const [data, setData] = useState<any[]>([]);
	// const [isLoading, setLoading] = useState(false);
	// const fetchData = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const res = await getFetcher(`/chatroom/chat?destId=${id}`);
	// 		setData(res);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 		setLoading(false);
	// 	}
	// };
	//
	// useEffect(() => {
	// 	fetchData();
	// }, []);

	// if (isLoading) return <Skeleton />;
	// if (!data) return <div></div>;

	return (
		<div>
			<MenuHeader title={'1:1 채팅'} type={'chat'}>
				<ChattingListPage channelId={params?.id} />
			</MenuHeader>
			{/*채팅 영역*/}
			<Stack padding={2} gap={2}>
				<ChatMsg userId={''} />
				<StatusMsg content={'임시 메세지입니다.'} />
				<HelpMsg />
			</Stack>
			{/*@todo sendChat은 일반 채팅이랑 따로 분리*/}
			{/*<SendChat sendAction={sendAction} commandAction={commandAction} />*/}
		</div>
	);
};
