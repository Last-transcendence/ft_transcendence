import { BottomButton } from '@/component/common/ButtomButton';
import Visibility from '@/component/chat/create/visibility';
import { ChannelVisibility } from '@/type/channel.type';

interface CreateChatSubmitProps {
	visibility: ChannelVisibility;
	title: string;
	password: string;
}

const CreateChatSubmit = ({ visibility, title, password }: CreateChatSubmitProps) => {
	return (
		<BottomButton
			title={'생성하기'}
			onClick={() => {
				alert(JSON.stringify({ visibility, title, password }));
			}}
		/>
	);
};

export default CreateChatSubmit;
