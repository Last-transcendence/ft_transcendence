import { Badge } from '@mui/material';
import SmallAvatar from './smallAvatar';
import BigAvatar from './bigAvatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface UserPhotoProps {
	imgUrl: string | ArrayBuffer | null;
	onClick: () => void;
	onChangePicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPhoto = ({ imgUrl, onClick, onChangePicture }: UserPhotoProps) => {
	return (
		<Badge
			overlap="circular"
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeContent={
				<SmallAvatar alt="add img" onClick={onClick}>
					<AddAPhotoIcon />
				</SmallAvatar>
			}
		>
			<BigAvatar alt="person img" src={imgUrl ? (imgUrl as string) : ''} />
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
