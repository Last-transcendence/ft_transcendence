import style from '../../style/friend/index.module.css';
import AddFriend from './add';
import FriendList from './list';
import useFetchData from '@/hook/useFetchData';
import Friend from '@/type/friend.type';
import Block from '@/type/block.type';

const FriendPage = () => {
	const { data, refetch } = useFetchData<Friend[]>('/friend');
	const { data: blockData, refetch: blockRefetch } = useFetchData<Block[]>('/block');

	return (
		<div className={style.container}>
			<AddFriend
				friendList={data}
				refetch={refetch}
				blockList={blockData}
				blockRefetch={blockRefetch}
			/>
			<FriendList data={data} refetch={refetch} blockRefetch={blockRefetch} />
		</div>
	);
};

export default FriendPage;
