import Image from 'next/image';

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
	let wValue = 0;
	let hValue = 0;
	if (typeof avatarImgStyle === undefined) {
		wValue = 50;
		hValue = 50;
	} else {
		wValue = 150;
		hValue = 150;
	}
	const loader = ({ src }: { src: string }): string => {
		return `https://dev.transcendence.42seoul.kr/upload/${src}`;
	};
	return (
		<Image
			loader={loader}
			src={image || '/unknown_user.png'}
			alt={name || 'user'}
			width={wValue}
			height={hValue}
			priority
			style={avatarImgStyle}
		/>
	);
};

export default MyImage;
