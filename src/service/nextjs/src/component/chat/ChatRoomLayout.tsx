import { useParams } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import { ParticipantRole } from '@/type/channel.type';
import SendChat from '@/component/chat/SendChat';

export type CommandType = 'DM' | 'INVITE' | 'GAME' | 'HELP';

interface ChatRoomLayoutProps {
	type: 'chat' | 'dm';
	children: ReactNode;
	myRole?: ParticipantRole;
	chatRoomData?: any; //추후에 쓰일 chat room data
}

const ChatRoomLayout = ({ type, children, myRole, chatRoomData }: ChatRoomLayoutProps) => {
	const params = useParams<{ id: string }>();
	// 실시간으로 보여질 채팅 데이터
	const [chatLiveData, setChatLiveData] = useState<any[]>(chatRoomData);

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
							userId={data?.id}
							nickname={data?.nickname}
							key={index}
							myRole={type === 'chat' ? myRole : undefined}
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

export default ChatRoomLayout;
