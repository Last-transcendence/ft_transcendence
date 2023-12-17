import React, { useEffect, useRef, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import SendChat from '@/component/chat/SendChat';
import { MenuHeader } from '@/component/common/Header';
import UserBriefInformation from '@/component/common/user/bried-information';
import FriendStatus from '@/component/friend/list/status';
import style from '@/style/friend/list/index.module.css';
import ChattingListPage from '@/component/chat/ChatList';

const ChatPage = () => {
	return (
		<div>
			<MenuHeader title={'채팅'} position={'right'}>
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
