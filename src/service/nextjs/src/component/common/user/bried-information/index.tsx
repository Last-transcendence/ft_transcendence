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
	imgUrl: string | undefined | null;
	refetch?: () => void;
}

const UserBriefInformation = ({
	nickname,
	condition,
	className,
	userId,
	isMute,
	imgUrl,
	refetch,
}: UserBriefInformationProps) => {
	return (
		<div className={className}>
			<OpenProfileAvatar otherUserId={userId} imgUrl={imgUrl} refetch={refetch} />
			<div>{nickname}</div>
			{condition && <div>{condition}</div>}
			{isMute && <VolumeOffIcon />}
		</div>
	);
};

export default UserBriefInformation;
