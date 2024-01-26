import styles from "@/style/common/detailProfile/index.module.css"
import { Container, Typography, Box } from '@mui/material';
import NewIcon from '../../profile/common/NewIcon';
import BottomProfile from './BottomProfile';
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
			<Container maxWidth="lg">
				<NewIcon {...ar} image={userData.profileImageURI} name={userData.nickname} />
				<Box marginTop="4%" display="flex" flexDirection="column" alignItems="center">
					<p className={styles['open-profile-avatar__nickname']}>{userData.nickname}</p>
					<Typography className={styles['open-profile-avatar__status']} variant="body1">
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
