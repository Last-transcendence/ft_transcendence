interface SVGIconProps {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}

const MatchingButtonIcon = ({ width, height, onClick }: SVGIconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 62 62"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			onClick={onClick}
		>
			<rect width="62" height="62" fill="url(#pattern0)" style={{ mixBlendMode: 'overlay' }} />
			<defs>
				<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_38_10" transform="scale(0.0104167)" />
				</pattern>
				<image
					id="image0_38_10"
					width="96"
					height="96"
					xlinkHref="data:image/png;base64,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"
				/>
			</defs>
		</svg>
	);
};

export default MatchingButtonIcon;
