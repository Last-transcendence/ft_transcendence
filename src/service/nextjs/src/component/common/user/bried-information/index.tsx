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
	blockRefetch?: () => void;
}

const UserBriefInformation = ({
	nickname,
	condition,
	className,
	userId,
	isMute,
	imgUrl,
	refetch,
	blockRefetch,
}: UserBriefInformationProps) => {
	return (
		<div className={className}>
			<OpenProfileAvatar otherUserId={userId} imgUrl={imgUrl} refetch={refetch} blockRefetch={blockRefetch} />
			<div>{nickname}</div>
			{condition && <div>{condition}</div>}
			{isMute && <VolumeOffIcon />}
		</div>
	);
};

export default UserBriefInformation;
