import style from '../../style/friend/index.module.css';
import AddFriend from './add';
import FriendList from './list';
import useFetchData from '@/hook/useFetchData';
import Friend from '@/type/friend.type';

const FriendPage = () => {
	const { data, refetch } = useFetchData<Friend[]>('/friend');

	return (
		<div className={style.container}>
			<AddFriend friendList={data} refetch={refetch} />
			<FriendList data={data} />
		</div>
	);
};

export default FriendPage;
