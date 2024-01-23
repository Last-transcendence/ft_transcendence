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
import CustomConfirmModal from '@/component/common/CustomConfirmModal';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

type DmType = {
	channelId: string;
	userId: string;
	message: string;
};

const ListenContext = createContext<{
	currentDm: DmType;
	setCurrentDm: Dispatch<SetStateAction<DmType>>;
}>({
	currentDm: {
		channelId: '',
		userId: '',
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
		userId: '',
		message: '',
	});
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<{
		title: string;
		content: string;
	}>({
		title: '',
		content: '',
	});
	const [toastOpen, setToastOpen] = useState<boolean>(false);
	const [toastMessage, setToastMessage] = useState<string>('');

	//@todo 제대로 작동할지 예상이 안가서, 소켓 테스트 후 주석 해제하겠습니다.
	useEffect(() => {
		//게임 중이면 무시
		if (sockets?.chatSocket) {
			(sockets.chatSocket as any).on('message', (res: any) => {
				console.log('dm message', res);
				if (router.pathname.includes('game')) return;
				if (!res?.message || res.message === '') return;
				//DM방에 있을때, 해당 DM방에서 보낸 메세지면 setCurrentDm
				if (router.pathname.includes('private')) {
					console.log('params res', params?.id, res?.userId);
					if (params?.id && params?.id === res?.userId) {
						console.log('dm res!!', res);
						setCurrentDm(res);
					} else {
						const message = res?.message.slice(0, 8);
						setToastMessage(`${res?.nickname}: ${message}`);
						setToastOpen(true);
					}
				}
			});
			(sockets.chatSocket as any).on('game', (res: any) => {
				setMessage({
					title: '게임 초대',
					content: `${res?.nickname}님이 1:1 게임을 초대했습니다`,
				});
				setOpen(true);
			});
		}
		return () => {
			if (sockets?.chatSocket) {
				(sockets.chatSocket as any).off('message');
				(sockets.chatSocket as any).off('game');
			}
		};
	}, [params?.id, router.pathname, sockets.chatSocket]);

	return (
		<>
			{open && (
				<CustomConfirmModal
					setIsOpened={setOpen}
					onConfirm={() => {
						setOpen(false);
						//게임 승낙
						sockets.channelSocket?.emit('game');
					}}
					onCancel={() => {
						setOpen(false);
						//게임 거절
					}}
					title={message.title}
					content={message.content}
				/>
			)}
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
