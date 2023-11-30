import { css } from '@emotion/css';
import React, { useEffect, useState } from 'react';

const ProfileImageStyle = css({
	borderRadius: '70%',
	objectFit: 'cover',
	overflow: 'hidden',
});

const EmptyProfileImage = (props: {
	width: number;
	height: number;
	isCircle: boolean | null;
	className: string | null;
}) => {
	const { width, height } = props;
	const isCircle = props.isCircle ? props.isCircle : true;
	const className = props.className ? props.className : undefined;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			className={className}
		>
			{isCircle ? <circle cx={width / 2} cy={height / 2} r={width / 2} fill="#D9D9D9" /> : null}
		</svg>
	);
};

const AWSProfileImage = (props: {
	src: string;
	width: number;
	height: number;
	isCircle: boolean | null;
	className: string | null;
}) => {
	const { src, width, height } = props;
	const isCircle = props.isCircle !== null ? props.isCircle : true;
	const className = props.className ? props.className : undefined;
	const [hashedSrc, setHashedSrc] = useState<string | undefined>(src);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		let intervalId: NodeJS.Timer | undefined = undefined;

		if (isError && !intervalId) {
			intervalId = setInterval(() => {
				setHashedSrc(`${src}#${Date.now()}`);
			}, 500);
		} else if (!isError && intervalId) {
			clearInterval(intervalId);
		} else {
			setHashedSrc(src);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [src, isError, setHashedSrc]);

	return (
		<div className={isCircle ? ProfileImageStyle : undefined} style={{ width, height }}>
			<img
				src={hashedSrc}
				width={width}
				height={height}
				className={className}
				onError={() => {
					setIsError(true);
				}}
				onLoad={() => {
					setIsError(false);
				}}
			/>
		</div>
	);
};

export const ProfileImage = (props: {
	src: string | undefined;
	width: number;
	height: number;
	isCircle: boolean | null;
	className: string | null;
}) => {
	const { src, width, height } = props;

	return src ? (
		<AWSProfileImage
			src={src}
			width={width}
			height={height}
			isCircle={props.isCircle}
			className={props.className}
		/>
	) : (
		<EmptyProfileImage
			width={width}
			height={height}
			isCircle={props.isCircle}
			className={props.className}
		/>
	);
};
