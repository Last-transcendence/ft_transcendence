import CommonChatRoomPage from '@/component/chat/CommonChatRoomPage';
import IsWithAuth from '@/component/common/accessControl/IsWithAuth';

const ChatCommonPage = () => {
	return <CommonChatRoomPage />;
};

export default IsWithAuth(ChatCommonPage);
