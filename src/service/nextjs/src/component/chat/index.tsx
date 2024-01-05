import { Stack } from '@mui/material';
import { ChatMsg, HelpMsg, StatusMsg } from '@/component/chat/Message';
import SendChat from '@/component/chat/SendChat';
import ChattingListPage from '@/component/chat/ChatList';
import { MenuHeader } from '@/component/common/Header';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const CommonChatRoom = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div>
			<MenuHeader title={'채팅'} type={'chat'}>
				<ChattingListPage id={id} />
			</MenuHeader>
			{/*채팅 영역*/}
			<Stack padding={2} spacing={2}>
				<ChatMsg />
				<StatusMsg />
				<HelpMsg />
			</Stack>
			<SendChat />
		</div>
	);
};

export const PrivateChatRoom = () => {
	const { id } = useParams<{ id: string }>();
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
				<ChattingListPage id={id} />
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
