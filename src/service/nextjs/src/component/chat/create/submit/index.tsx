import { Visibility } from '@/pages/chat/create';
import style from '../../../../style/chat/create/submit/index.module.css';

interface CreateChatSubmitProps {
	visibility: Visibility;
	title: string;
	password: string;
}

const CreateChatSubmit = ({ visibility, title, password }: CreateChatSubmitProps) => {
	return (
		<div
			className={style.container}
			onClick={() => {
				alert(JSON.stringify({ visibility, title, password }));
			}}
		>
			<span>생성하기</span>
		</div>
	);
};

export default CreateChatSubmit;
