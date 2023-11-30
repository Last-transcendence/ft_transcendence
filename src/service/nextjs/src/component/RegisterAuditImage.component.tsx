import { css } from '@emotion/css';
import React, { useEffect, useState } from 'react';

const AuditImageStyle = css({
	border: '2px solid black',
	objectFit: 'cover',
	overflow: 'hidden',
});

const EmptyAuditImage = (props: {
	width: number;
	height: number;
	isRectangle: boolean | null;
	className: string | null;
}) => {
	const { width, height } = props;
	const isRectangle = props.isRectangle ? props.isRectangle : true;
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
			{isRectangle ? <rect x={width / 2} y={height / 2} fill="#D9D9D9" /> : null}
		</svg>
	);
};

const AWSAuditImage = (props: {
	src: string;
	width: number;
	height: number;
	isRectangle: boolean | null;
	className: string | null;
}) => {
	const { src, width, height } = props;
	const isRectangle = props.isRectangle !== null ? props.isRectangle : true;
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
		<div className={isRectangle ? AuditImageStyle : undefined} style={{ width, height }}>
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

export const AuditImage = (props: {
	src: string | undefined;
	width: number;
	height: number;
	isRectangle: boolean | null;
	className: string | null;
}) => {
	const { src, width, height } = props;

	return src ? (
		<AWSAuditImage
			src={src}
			width={width}
			height={height}
			isRectangle={props.isRectangle}
			className={props.className}
		/>
	) : (
		<EmptyAuditImage
			width={width}
			height={height}
			isRectangle={props.isRectangle}
			className={props.className}
		/>
	);
};
