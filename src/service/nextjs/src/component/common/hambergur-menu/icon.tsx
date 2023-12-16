interface IconProps {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}

const CloseIcon = ({ width, height, onClick }: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			onClick={onClick}
		>
			<rect width="32" height="32" fill="url(#pattern0)" />
			<defs>
				<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_14_384" transform="scale(0.0104167)" />
				</pattern>
				<image
					id="image0_14_384"
					width="96"
					height="96"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABwUlEQVR4nO2cQW7CMBQF/5nyFuFmdNcue9lWuYG7SSSEgBIK/f/ZM2sW8YytBDtKBAAAAAAAAAAAAAAAANjyFhFz+DOvY7HiIyJaRCwRcQhfFBHf61g+w0x+M4+gE/nNJcK5fNcIuiC/fIRr8t0i6Ib8shHefrng0wiVb8zzeo33jKXUjXmKiK8dEQ6mM79VnkjOEeQu3zmCepHvGEG9yXeKoF7lO0RQ7/IrR9Ao8itG0GjyK0XQqPIrRNDo8jMjCPl5EYT8vAhCfl4EIT8vgpCfF0HIz4sg5OdFEPLzIgj5eeeyy87fdvsPN3MlNOTXjrAw8/MiLMjPWwkL8vMiLMh/LtrxqLln2wJeIJ8IBeQ3VkK+/EaEfPmNCPuZ2YrIQw9srFV45aUL9IddTSIkyt8gwoPoifv5REiUv0GEO9ELT7KIkCh/gwhX+M8z3IlH1Dz5G0RYyXx7YRp9JVR4dWQaNUIF+cNGqCR/uAgV5Q8TobL87iM4yO82gpP87iI4yu8mgrP8LiLwybICHE1n/iMr4T2KcjSXf0+EsvKvRXCTfytCefnnEVzlX4pgI3+Dj3cDAAAAAAAAAAAAAABApPMDku+sSq/QIeEAAAAASUVORK5CYII="
				/>
			</defs>
		</svg>
	);
};

export default CloseIcon;
