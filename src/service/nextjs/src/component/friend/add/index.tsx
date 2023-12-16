import style from '../../../style/friend/add/index.module.css';
import SearchFriend from './search';

const Title = () => {
	return (
		<div>
			<span>친구 추가</span>
		</div>
	);
};

const AddFriend = () => {
	return (
		<div className={style.container}>
			<Title />
			<SearchFriend />
		</div>
	);
};

export default AddFriend;
