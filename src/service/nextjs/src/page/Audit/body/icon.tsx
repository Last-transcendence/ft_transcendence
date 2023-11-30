import React from 'react';

export const ExportIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 25"
			fill="none"
		>
			<path
				d="M18 15.0939V18.0939H6V15.0939H4V18.0939C4 19.1939 4.9 20.0939 6 20.0939H18C19.1 20.0939 20 19.1939 20 18.0939V15.0939H18ZM7 9.09387L8.41 10.5039L11 7.92387V16.0939H13V7.92387L15.59 10.5039L17 9.09387L12 4.09387L7 9.09387Z"
				fill="black"
			/>
		</svg>
	);
};

export const DownArrowIcon = (props: {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}) => {
	const { width, height, onClick } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 22 12"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M1 1.09387L9.58579 9.67966C10.3668 10.4607 11.6332 10.4607 12.4142 9.67966L21 1.09387"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};
