import { ReactNode } from 'react';
import { DefaultProfileImageIcon } from './icon';
import Avatar from '@mui/material/Avatar';

interface UserBriefInformationProps {
	profileImageSrc: string | null | undefined;
	nickName: ReactNode;
	condition?: ReactNode;
	className?: string;
}

const UserBriefInformation = ({
	profileImageSrc,
	nickName,
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
			<div>{nickName}</div>
			{condition && <div>{condition}</div>}
		</div>
	);
};

export default UserBriefInformation;
