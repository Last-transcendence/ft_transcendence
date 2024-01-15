import style from '../../style/friend/index.module.css';
import AddFriend from './add';
import FriendList from './list';
import useFetchData from '@/hook/useFetchData';
import Friend from '@/type/friend.type';

const FriendPage = () => {
	const { data, isLoading } = useFetchData<Friend[]>('/friend');

	return (
		<div className={style.container}>
			<AddFriend friendList={data} />
			<FriendList data={data} isLoading={isLoading} />
		</div>
	);
};

export default FriendPage;
