import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import SocketContext from '@/context/socket.context';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import useFetchData from '@/hook/useFetchData';
import FriendType from '@/type/friend.type';

type DmType = {
	channelId: string;
	srcId: string;
	message: string;
};

const ListenContext = createContext<{
	currentDm: DmType;
	setCurrentDm: Dispatch<SetStateAction<DmType>>;
}>({
	currentDm: {
		channelId: '',
		srcId: '',
		message: '',
	},
	setCurrentDm: () => {},
});

export const ListenProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const { sockets } = useContext(SocketContext);
	const [currentDm, setCurrentDm] = useState<DmType>({
		channelId: '',
		srcId: '',
		message: '',
	});
	const [toastOpen, setToastOpen] = useState<boolean>(false);
	const [toastMessage, setToastMessage] = useState<string>('');
	const { data: friendDatas } = useFetchData<FriendType[]>('/friend');

	useEffect(() => {
		//게임 중이면 무시
		if (sockets?.chatSocket) {
			if (friendDatas) {
				console.log('dmDatas', friendDatas);
				friendDatas?.forEach(data => {
					(sockets.chatSocket as any).emit('join', { destId: data?.id }, (res: any) => {
						console.log('join', res);
					});
				});
			}

			(sockets.chatSocket as any).on('message', (res: any) => {
				if (router.pathname.includes('game')) return;
				if (!res?.message || res.message === '') return;
				//DM방에 있을때, 해당 DM방에서 보낸 메세지면 setCurrentDm
				if (router.pathname.includes('private')) {
					console.log('params res', params?.id, res?.srcId);
					if (params?.id && params?.id === res?.srcId) {
						console.log(params.id, res.srcId);
						setCurrentDm(res);
					}
				} else {
					console.log('toast', res?.srcNickname, res?.message);
					const message = res?.message.slice(0, 8);
					setToastMessage(`${res?.srcNickname}: ${message}`);
					setToastOpen(true);
				}
			});

			// (sockets.chatSocket as any).on('game', (res: any) => {
			// 	setMessage({
			// 		title: '게임 초대',
			// 		content: `${res?.nickname}님이 1:1 게임을 초대했습니다`,
			// 	});
			// 	setOpen(true);
			// });
		}
		return () => {
			if (sockets?.chatSocket) {
				(sockets.chatSocket as any).off('message');
				// (sockets.chatSocket as any).off('game');
			}
		};
	}, [friendDatas, params?.id, router.pathname, sockets]);

	return (
		<>
			{/*{open && (*/}
			{/*	<CustomConfirmModal*/}
			{/*		setIsOpened={setOpen}*/}
			{/*		onConfirm={() => {*/}
			{/*			setOpen(false);*/}
			{/*			//게임 승낙*/}
			{/*			sockets.channelSocket?.emit('game');*/}
			{/*		}}*/}
			{/*		onCancel={() => {*/}
			{/*			setOpen(false);*/}
			{/*			//게임 거절*/}
			{/*		}}*/}
			{/*		title={message.title}*/}
			{/*		content={message.content}*/}
			{/*	/>*/}
			{/*)}*/}
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={toastOpen}
				onClose={() => {
					setToastOpen(false);
				}}
				message={toastMessage}
			/>
			<ListenContext.Provider value={{ currentDm, setCurrentDm }}>
				{children}
			</ListenContext.Provider>
		</>
	);
};

export default ListenContext;
