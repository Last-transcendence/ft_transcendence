import { Container, Box } from '@mui/material';
import FightRecords, { fightRecordsProps } from './fightRecords';
import MyProfileMenu from './myProfileMenu';
import ProfileAvartar from './profileAvatar';
import TwoFACheck from './2faCheck';
import { myImageProps } from '../common/myImage';
import UserId from '@/component/profile/myProfile/userId';
import Odds from '@/component/profile/myProfile/odds';

export interface myProfilePageProps extends myImageProps, fightRecordsProps {
	odds: number;
}

const MyProfileBody = ({ fightRecords, odds, ...userType }: myProfilePageProps) => {
	return (
		<Box height="92.5vh" overflow="auto">
			<Container maxWidth="xs" sx={{ paddingBottom: 15 }}>
				<MyProfileMenu />
				<ProfileAvartar {...userType} />
				<UserId userName={userType.name} />
				<Box display="flex" flexDirection="column" alignItems="center">
					<TwoFACheck twoFA={true} />
					<div style={{ marginTop: '-30px' }}>
						<Odds odds={odds} />
					</div>
				</Box>
				<FightRecords fightRecords={fightRecords} />
			</Container>
		</Box>
	);
};

export default MyProfileBody;
