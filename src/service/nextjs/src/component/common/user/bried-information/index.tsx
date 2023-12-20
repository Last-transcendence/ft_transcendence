import { ReactNode } from 'react';
import { DefaultProfileImageIcon } from './icon';
import Image from 'next/image';

interface UserBriefInformationProps {
	profileImageSrc: string | null;
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
				<Image src={profileImageSrc} width={32} height={32} alt="profile" />
			) : (
				<DefaultProfileImageIcon width={32} height={32} />
			)}
			<div>{nickName}</div>
			<div>{condition}</div>
		</div>
	);
};

export default UserBriefInformation;
