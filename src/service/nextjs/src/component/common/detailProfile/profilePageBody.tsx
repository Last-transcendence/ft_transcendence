import { Container, Typography, Box } from '@mui/material';
import NewIcon from '../../profile/common/newIcon';
import BottomProfile from './bottomProfile';
import { Dispatch, SetStateAction } from 'react';
import Loading from '../Loading';
import User from '@/type/user.type';

const ar = {
	sxStyle: { width: 150, height: 150 },
	imgStyle: {},
	message: undefined,
};

interface ProfilePageBodyProps {
	userData: User;
	isFriend: undefined | boolean;
	setIsFriend: Dispatch<SetStateAction<boolean | undefined>>;
	isBlock: undefined | boolean;
	refetch?: () => void;
}

const ProfilePageBody = ({
	userData,
	isFriend,
	setIsFriend,
	isBlock,
	refetch,
}: ProfilePageBodyProps) => {
	return isFriend === undefined &&
		isBlock === undefined &&
		userData.profileImageURI === undefined ? (
		<Loading />
	) : (
		<div>
			<Container maxWidth="xs">
				<NewIcon {...ar} image={userData.profileImageURI} name={userData.nickname} />
				<Box marginTop="10%" display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h5">{userData.nickname}</Typography>
					<Typography style={{ opacity: 0.5 }} variant="h6">
						{userData.status}
					</Typography>
				</Box>
				{!isBlock && (
					<BottomProfile
						otherUserId={userData.id}
						setIsFriend={setIsFriend}
						isFriend={isFriend}
						refetch={refetch}
					/>
				)}
				{isBlock && (
					<Typography variant="h5" marginTop={2} textAlign={'center'}>
						차단된 유저입니다.
					</Typography>
				)}
			</Container>
		</div>
	);
};

export default ProfilePageBody;
