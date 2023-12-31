import MyProfileBody, { myProfilePageProps } from './myProfileBodys';
import { BottomButton } from '@/component/common/ButtomButton';

const MyProfilePage = ({ fightRecords, odds, ...userType }: myProfilePageProps) => {
	const onClick = () => {};
	return (
		<div>
			<MyProfileBody fightRecords={fightRecords} odds={odds} {...userType} />
			<BottomButton title="수정" onClick={onClick} />
		</div>
	);
};

export default MyProfilePage;
