import { Visibility } from '@/pages/chat/create';
import { BottomButton } from '@/component/common/ButtomButton';

interface CreateChatSubmitProps {
	visibility: Visibility;
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
