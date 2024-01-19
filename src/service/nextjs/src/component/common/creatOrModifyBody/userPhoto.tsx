import { Badge } from '@mui/material';
import Image from 'next/image';
import SmallAvatar from './smallAvatar';
import BigAvatar from './bigAvatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface UserPhotoProps {
	imgUrl: string;
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
			<BigAvatar alt="person img">
				<Image loader={loader} src={imgUrl} alt="user img" width={150} height={150} priority />
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
