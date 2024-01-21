import Image from 'next/image';
import { UNKNOWN_PROFILE_IMAGE_URI } from '@/common/constant';

export interface imgStyle {
	width?: string;
	height?: string;
}

export interface avatarImgStyle {
	avatarImgStyle?: imgStyle;
}

export interface myImageProps {
	name?: string;
	image?: string;
}

const MyImage = ({ name, image, avatarImgStyle }: myImageProps & avatarImgStyle) => {
	const loader = ({ src }: { src: string }): string => {
		return `https://dev.transcendence.42seoul.kr/upload/${src}`;
	};
	let wValue = 0;
	let hValue = 0;
	if (typeof avatarImgStyle === undefined) {
		wValue = 50;
		hValue = 50;
	} else {
		wValue = 150;
		hValue = 150;
	}
	return image === '' ? (
		<Image src={UNKNOWN_PROFILE_IMAGE_URI} alt={'user img'} width={150} height={150} priority />
	) : (
		<Image
			loader={loader}
			src={image || '/unknown_user.png'}
			alt={name || 'user'}
			width={wValue}
			height={hValue}
			style={avatarImgStyle}
			priority
		/>
	);
};

export default MyImage;
