import { ReactNode } from 'react';
import { DefaultProfileImageIcon } from './icon';
import Avatar from '@mui/material/Avatar';

interface UserBriefInformationProps {
	profileImageSrc: string | null | undefined;
	nickname: ReactNode;
	condition?: ReactNode;
	className?: string;
}

const UserBriefInformation = ({
	profileImageSrc,
	nickname,
	condition,
	className,
}: UserBriefInformationProps) => {
	return (
		<div className={className}>
			{profileImageSrc ? (
				<Avatar src={profileImageSrc} alt="profile" />
			) : (
				<DefaultProfileImageIcon width={32} height={32} />
			)}
			<div>{nickname}</div>
			{condition && <div>{condition}</div>}
		</div>
	);
};

export default UserBriefInformation;
