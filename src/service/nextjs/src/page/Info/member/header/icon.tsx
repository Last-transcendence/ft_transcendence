import React from 'react';

export const MemberIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 50 30"
			fill="none"
		>
			<path
				d="M49.3984 28.5693C49.3984 20.837 43.3546 14.5693 35.8984 14.5693C28.4423 14.5693 22.3984 20.837 22.3984 28.5693H35.8984H49.3984Z"
				fill="black"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M35.8984 14.5693C40.0406 14.5693 43.3984 11.4353 43.3984 7.56934C43.3984 3.70334 40.0406 0.569336 35.8984 0.569336C31.7563 0.569336 28.3984 3.70334 28.3984 7.56934C28.3984 11.4353 31.7563 14.5693 35.8984 14.5693Z"
				fill="black"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M28.3984 28.5693C28.3984 20.837 22.3546 14.5693 14.8984 14.5693C7.44227 14.5693 1.39844 20.837 1.39844 28.5693H28.3984Z"
				fill="black"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.8984 14.5693C19.0406 14.5693 22.3984 11.4353 22.3984 7.56934C22.3984 3.70334 19.0406 0.569336 14.8984 0.569336C10.7563 0.569336 7.39844 3.70334 7.39844 7.56934C7.39844 11.4353 10.7563 14.5693 14.8984 14.5693Z"
				fill="black"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const OpenIcon = (props: {
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
			viewBox="0 0 12 22"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M1 21L9.58579 12.4142C10.3668 11.6332 10.3668 10.3668 9.58579 9.58579L1 1"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export const CloseIcon = (props: {
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
			viewBox="0 0 22 12"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M1 1L9.58579 9.58579C10.3668 10.3668 11.6332 10.3668 12.4142 9.58579L21 0.999999"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};
