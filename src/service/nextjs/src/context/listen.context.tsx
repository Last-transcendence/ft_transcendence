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
import CustomConfirmModal from '@/component/common/CustomConfirmModal';

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
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<{ title: string; content: string }>({
		title: '',
		content: '',
	});
	const [inviteRes, setInviteRes] = useState<{
		srcId: string;
		srcNickname: string;
		channelTitle: string;
		channelId: string;
	} | null>(null);

	useEffect(() => {
		//게임 중이면 무시
		if (sockets?.chatSocket) {
			if (friendDatas) {
				friendDatas?.forEach(data => {
					(sockets.chatSocket as any).emit('join', { destId: data?.id }, (res: any) => {
						console.log('join', res);
					});
				});
			}

			(sockets.chatSocket as any).on('message', (res: any) => {
				console.log('listen chat msg', res);
				if (router.pathname.includes('game')) return;
				if (!res?.message || res.message === '') return;
				if (router.pathname.includes('private')) {
					if (params?.id && params?.id === res?.srcId) {
						setCurrentDm(res);
					}
				} else {
					const message = res?.message.slice(0, 8);
					setToastMessage(`${res?.srcNickname}: ${message}`);
					setToastOpen(true);
				}
			});
		}

		if (sockets?.inviteSocket) {
			//invite 참여
			(sockets.inviteSocket as any).emit('join', (res: any) => {
				console.log('invite join res', res);
			});
			//invite 구독
			(sockets.inviteSocket as any).on(
				'invite',
				(res: { srcId: string; srcNickname: string; channelTitle: string; channelId: string }) => {
					console.log('invite on res', res);
					setMessage({
						title: 'private 채널 초대',
						content: `${res?.srcNickname}님이 private 채널 (:${res?.channelTitle})에 초대했습니다.`,
					});
					setInviteRes(res);
					setOpen(true);
				},
			);
		}
		return () => {
			if (sockets?.chatSocket) {
				(sockets.chatSocket as any).off('message');
				// (sockets.chatSocket as any).off('game');
			}
			if (sockets?.inviteSocket) {
				(sockets.inviteSocket as any).off('invite');
			}
		};
	}, [friendDatas, params?.id, router.pathname, sockets]);

	return (
		<>
			{open && (
				<CustomConfirmModal
					setIsOpened={setOpen}
					onConfirm={() => {
						setOpen(false);
						//초대 승낙
						sockets.channelSocket?.emit(
							'join',
							{ channelId: inviteRes?.channelId, password: '' },
							(res: any) => {
								if (res?.res) router.push(`/chat/${inviteRes?.channelId}/common`);
							},
						);
					}}
					onCancel={() => {
						setOpen(false);
						//초대 거절
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
