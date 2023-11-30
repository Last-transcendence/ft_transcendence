import React from 'react';

export const EmailIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 16"
			fill="none"
		>
			<path d="M1 1V15H19V1H18.6949M1 1L9.84746 8.80769L18.6949 1M1 1H18.6949" stroke="black" />
		</svg>
	);
};

export const SchoolIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 22"
			fill="none"
		>
			<path
				d="M9.84746 12H18.6949H19V21H1V12H9.84746ZM9.84746 12V8.5M9.84746 8.5V1L18.6949 5L9.84746 8.5Z"
				stroke="black"
			/>
		</svg>
	);
};

export const MajorIcon = (props: {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}) => {
	const { width, height, onClick = undefined } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 18 21"
			fill="none"
			onClick={onClick}
		>
			<rect x="0.5" y="0.5" width="17" height="20" stroke="black" />
			<path d="M4 4H14" stroke="black" />
			<path d="M4 8H14" stroke="black" />
			<path d="M4 12H14" stroke="black" />
			<path d="M4 16H14" stroke="black" />
		</svg>
	);
};

export const StudentIdIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
		>
			<rect x="0.5" y="0.5" width="17" height="17" stroke="black" />
			<path d="M6 7.4L9 5V13" stroke="black" />
		</svg>
	);
};

export const ClubIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 23 21"
			fill="none"
		>
			<circle cx="11.5" cy="12.5" r="7" stroke="black" />
			<circle cx="11.5" cy="4.5" r="4" fill="#EFEEEA" stroke="black" />
			<circle cx="4.5" cy="16.5" r="4" fill="#EFEEEA" stroke="black" />
			<circle cx="18.5" cy="16.5" r="4" fill="#EFEEEA" stroke="black" />
		</svg>
	);
};

export const PhoneNumberIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 22"
			fill="none"
		>
			<path
				d="M5.5 15.4484C2.40513 12.0174 -0.104678 6.35125 1.44332 1H6.60731L8.08101 6.39462L5.49902 8C7.97773 13.5653 11.2941 15.1432 12.499 15.5L14.3546 13.3079L19.0009 15.4484L17.999 20.5C14.3855 21.5703 8.6571 18.9484 5.5 15.4484Z"
				stroke="black"
			/>
		</svg>
	);
};

export const InstagramIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
		>
			<rect x="0.5" y="0.5" width="17" height="17" stroke="black" />
			<circle cx="9" cy="9" r="3.5" stroke="black" />
			<circle cx="13.5" cy="4.5" r="1" stroke="black" />
		</svg>
	);
};
