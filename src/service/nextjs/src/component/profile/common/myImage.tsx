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
		wValue = 100;
		hValue = 100;
	}
	return (
		<Image
			alt={name || 'user'}
			src={image || '/unknown_user.png'}
			width={wValue}
			height={hValue}
			style={avatarImgStyle}
		/>
	);
};

export default MyImage;
