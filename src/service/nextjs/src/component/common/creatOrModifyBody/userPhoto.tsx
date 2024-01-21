import { Badge } from '@mui/material';
import SmallAvatar from './smallAvatar';
import BigAvatar from './bigAvatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image';
import { UNKNOWN_PROFILE_IMAGE_URI } from '@/common/constant';

interface UserPhotoProps {
	imgUrl: string | ArrayBuffer | null;
	onClick: () => void;
	onChangePicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPhoto = ({ imgUrl, onClick, onChangePicture }: UserPhotoProps) => {
	const loader = ({ src }: { src: string }): string => {
		return `https://dev.transcendence.42seoul.kr/upload/${src}`;
	};
	return imgUrl === null ? (
		<></>
	) : (
		<Badge
			overlap="circular"
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeContent={
				<SmallAvatar alt="add img" onClick={onClick}>
					<AddAPhotoIcon />
				</SmallAvatar>
			}
		>
			<BigAvatar>
				{imgUrl === '' ? (
					<Image src={UNKNOWN_PROFILE_IMAGE_URI} alt={'user img'} width={150} height={150} />
				) : (
					<Image
						loader={loader}
						src={imgUrl as string}
						alt="user img"
						width={150}
						height={150}
						priority
					/>
				)}
			</BigAvatar>
			<input
				type="file"
				id="fileInput"
				onChange={onChangePicture}
				accept="image/*"
				style={{ display: 'none' }}
			/>
		</Badge>
	);
};

export default UserPhoto;
