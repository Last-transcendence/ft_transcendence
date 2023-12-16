import style from '../../style/friend/index.module.css';
import AddFriend from './add';
import FriendList from './list';

const FriendPage = () => {
	return (
		<div className={style.container}>
			<AddFriend />
			<FriendList />
		</div>
	);
};

export default FriendPage;
