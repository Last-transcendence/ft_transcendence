import { ReactNode } from 'react';
import { DefaultProfileImageIcon } from './icon';
import Avatar from '@mui/material/Avatar';
import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';

interface UserBriefInformationProps {
	nickname: ReactNode;
	condition?: ReactNode;
	className?: string;
	userId: string;
}

const UserBriefInformation = ({
	nickname,
	condition,
	className,
	userId,
}: UserBriefInformationProps) => {
	return (
		<div className={className}>
			<OpenProfileAvatar otherUserId={userId} />
			<div>{nickname}</div>
			{condition && <div>{condition}</div>}
		</div>
	);
};

export default UserBriefInformation;
