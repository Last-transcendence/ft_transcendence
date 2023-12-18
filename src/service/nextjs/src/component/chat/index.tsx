import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import SendChat from '@/component/chat/SendChat';
import ChattingListPage from '@/component/chat/ChatList';
import { MenuHeader } from '@/component/common/Header';

const ChatPage = () => {
	return (
		<div>
			<MenuHeader title={'채팅'} type={'chat'}>
				<ChattingListPage />
			</MenuHeader>
			{/*채팅 영역*/}
			<Stack padding={2} gap={2}>
				<ChatMsg />
				<StatusMsg />
				<HelpMsg />
			</Stack>
			<SendChat />
		</div>
	);
};

export default ChatPage;
