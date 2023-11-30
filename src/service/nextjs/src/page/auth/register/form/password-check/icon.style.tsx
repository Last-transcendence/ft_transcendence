import React from 'react';

export const ConfirmedIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
		>
			<path
				d="M9.97672 16.2057L5.80672 12.0357L4.38672 13.4457L9.97672 19.0357L21.9767 7.03573L20.5667 5.62573L9.97672 16.2057Z"
				fill="#36E136"
			/>
		</svg>
	);
};

export const UnconfirmedIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
		>
			<path
				d="M19.9766 7.19467L18.5666 5.78467L12.9766 11.3747L7.38656 5.78467L5.97656 7.19467L11.5666 12.7847L5.97656 18.3747L7.38656 19.7847L12.9766 14.1947L18.5666 19.7847L19.9766 18.3747L14.3866 12.7847L19.9766 7.19467Z"
				fill="red"
			/>
		</svg>
	);
};
