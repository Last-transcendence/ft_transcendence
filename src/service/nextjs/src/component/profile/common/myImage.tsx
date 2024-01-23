import CustomImage from '@/component/common/CustomImage';
import { UNKNOWN_PROFILE_IMAGE_URI } from '@/common/constant';

export interface myImageProps {
	name?: string;
	image?: string;
}

const MyImage = ({ name, image }: myImageProps) => {
	return image === '' ? (
		<CustomImage img={UNKNOWN_PROFILE_IMAGE_URI} alt={'user img'} />
	) : (
		<CustomImage useLoader img={image as string} alt={name as string} />
	);
};

export default MyImage;
