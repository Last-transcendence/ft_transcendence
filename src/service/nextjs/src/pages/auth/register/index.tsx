import CreatUserBody from '@/component/auth/register';
import IsWithNotAuth from '@/component/common/accessControl/IsWithNotAuth';

const CreatPage = () => {
	return (
		<>
			<CreatUserBody />
		</>
	);
};

export default IsWithNotAuth(CreatPage);
