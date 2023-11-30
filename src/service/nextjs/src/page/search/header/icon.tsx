import React from 'react';

export const BookmarkIcon = (props: {
	width: number | string;
	height: number | string;
	marked: boolean;
	onClick?: () => void;
}) => {
	const { width, height, marked, onClick = undefined } = props;

	return (
		<>
			{marked ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width}
					height={height}
					viewBox="0 0 17 23"
					fill="none"
					onClick={onClick}
				>
					<path d="M16 0.5H1V21.5L8.5 14.1957L16 21.5V0.5Z" fill="black" stroke="black" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width}
					height={height}
					viewBox="0 0 12 17"
					fill="none"
					onClick={onClick}
				>
					<path d="M11 1H1V15L6 10.1304L11 15V1Z" stroke="black" />
				</svg>
			)}
		</>
	);
};

export const SearchIcon = (props: { width: number | string; height: number | string }) => {
	const { width, height } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
			fill="none"
		>
			<path
				d="M29.0006 27.5856L21.4486 20.0336C23.2634 17.8549 24.1684 15.0605 23.9753 12.2315C23.7822 9.4026 22.5059 6.75702 20.4118 4.84514C18.3178 2.93327 15.5673 1.9023 12.7326 1.96671C9.89778 2.03112 7.19696 3.18596 5.19194 5.19097C3.18693 7.19598 2.0321 9.8968 1.96769 12.7316C1.90328 15.5664 2.93424 18.3169 4.84612 20.4109C6.75799 22.5049 9.40357 23.7812 12.2325 23.9743C15.0614 24.1674 17.8559 23.2624 20.0346 21.4476L27.5866 28.9996L29.0006 27.5856ZM4.0006 12.9996C4.0006 11.2196 4.52844 9.47954 5.51738 7.9995C6.50631 6.51945 7.91192 5.3659 9.55645 4.68471C11.201 4.00352 13.0106 3.82529 14.7564 4.17256C16.5022 4.51983 18.1059 5.37699 19.3646 6.63567C20.6232 7.89434 21.4804 9.49799 21.8277 11.2438C22.1749 12.9896 21.9967 14.7992 21.3155 16.4438C20.6343 18.0883 19.4808 19.4939 18.0007 20.4829C16.5207 21.4718 14.7806 21.9996 13.0006 21.9996C10.6145 21.997 8.32682 21.0479 6.63957 19.3607C4.95231 17.6734 4.00325 15.3858 4.0006 12.9996Z"
				fill="black"
			/>
		</svg>
	);
};
