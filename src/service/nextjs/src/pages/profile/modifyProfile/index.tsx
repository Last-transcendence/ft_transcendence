import ModifyMyProfile from '@/component/profile/modifyProfile';
import IsWithAuth from '@/component/common/accessControl/IsWithAuth';

const modifyProfile = () => {
	return (
		<>
			<ModifyMyProfile />
		</>
	);
};

export default IsWithAuth(modifyProfile);
