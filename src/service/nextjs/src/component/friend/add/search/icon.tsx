interface IconProps {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}

export const SearchIcon = ({ width, height, onClick }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 23 23"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M16.438 14.4654H15.3991L15.0309 14.1103C16.3196 12.6112 17.0955 10.665 17.0955 8.54774C17.0955 3.82676 13.2687 0 8.54774 0C3.82676 0 0 3.82676 0 8.54774C0 13.2687 3.82676 17.0955 8.54774 17.0955C10.665 17.0955 12.6112 16.3196 14.1103 15.0309L14.4654 15.3991V16.438L21.0406 23L23 21.0406L16.438 14.4654ZM8.54774 14.4654C5.2733 14.4654 2.63007 11.8222 2.63007 8.54774C2.63007 5.2733 5.2733 2.63007 8.54774 2.63007C11.8222 2.63007 14.4654 5.2733 14.4654 8.54774C14.4654 11.8222 11.8222 14.4654 8.54774 14.4654Z"
				fill="black"
			/>
		</svg>
	);
};
