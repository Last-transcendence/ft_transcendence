import React, { ReactNode } from 'react';
import { DefaultProfileImageIcon } from './icon';
import Avatar from '@mui/material/Avatar';
import OpenProfileAvatar from '@/component/common/detailProfile/openProfileAvatar';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface UserBriefInformationProps {
	nickname: ReactNode;
	condition?: ReactNode;
	className?: string;
	userId: string;
	isMute?: boolean;
}

const UserBriefInformation = ({
	nickname,
	condition,
	className,
	userId,
	isMute,
}: UserBriefInformationProps) => {
	return (
		<div className={className}>
			<OpenProfileAvatar otherUserId={userId} />
			<div>{nickname}</div>
			{condition && <div>{condition}</div>}
			{isMute && <VolumeOffIcon />}
		</div>
	);
};

export default UserBriefInformation;
