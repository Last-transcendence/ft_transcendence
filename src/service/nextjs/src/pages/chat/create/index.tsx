'use client';

import ChannelSetting from '@/component/common/ChannelSetting';
import IsWithAuth from '@/component/common/accessControl/IsWithAuth';

const ChatCreatePage = () => {
	return <ChannelSetting isCreate={true} />;
};

export default IsWithAuth(ChatCreatePage);
