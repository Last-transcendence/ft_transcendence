import MyProfilePage from '@/component/profile/myProfile/';
import IsWithAuth from '@/component/common/accessControl/IsWithAuth';

const MyProfile = () => {
	return (
		<>
			<MyProfilePage />
		</>
	);
};

export default IsWithAuth(MyProfile);
