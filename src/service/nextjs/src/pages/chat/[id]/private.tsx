import PrivateChatRoomPage from '@/component/chat/PrivateChatRoomPage';
import IsWithAuth from '@/component/common/accessControl/IsWithAuth';

const ChatPrivatePage = () => {
	return <PrivateChatRoomPage />;
};

export default IsWithAuth(ChatPrivatePage);
