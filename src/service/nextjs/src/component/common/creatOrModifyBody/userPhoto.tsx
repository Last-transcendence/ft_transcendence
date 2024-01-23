import { Badge } from '@mui/material';
import SmallAvatar from './smallAvatar';
import BigAvatar from './bigAvatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CustomImage from '@/component/common/CustomImage';
import { UNKNOWN_PROFILE_IMAGE_URI } from '@/common/constant';
import { ChangeEvent } from 'react';

interface UserPhotoProps {
	imgUrl: string | ArrayBuffer | null;
	onClick: () => void;
	onChangePicture: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserPhoto = ({ imgUrl, onClick, onChangePicture }: UserPhotoProps) => {
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
					<CustomImage
						img={UNKNOWN_PROFILE_IMAGE_URI}
						alt={'user img'}
					/>
				) : (
					<CustomImage
					img={imgUrl as string}
					alt={'user img'}
					useLoader
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
