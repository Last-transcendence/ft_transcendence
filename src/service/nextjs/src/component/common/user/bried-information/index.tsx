import { ReactNode } from 'react';
import { DefaultProfileImageIcon } from './icon';
import Image from 'next/image';

interface UserBriefInformationProps {
	profileImageSrc: string | null;
	nickName: string | ReactNode;
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
			<span>{nickName}</span>
			{condition}
		</div>
	);
};

export default UserBriefInformation;
