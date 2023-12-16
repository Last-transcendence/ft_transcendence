interface IconProps {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}

export const DefaultProfileImageIcon = ({ width, height, onClick }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 7.168 24.832 0 16 0ZM16 4.8C18.656 4.8 20.8 6.944 20.8 9.6C20.8 12.256 18.656 14.4 16 14.4C13.344 14.4 11.2 12.256 11.2 9.6C11.2 6.944 13.344 4.8 16 4.8ZM16 27.52C12 27.52 8.464 25.472 6.4 22.368C6.448 19.184 12.8 17.44 16 17.44C19.184 17.44 25.552 19.184 25.6 22.368C23.536 25.472 20 27.52 16 27.52Z"
				fill="black"
			/>
		</svg>
	);
};
