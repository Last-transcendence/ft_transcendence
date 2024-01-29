interface SVGIconProps {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}

const MatchingButtonIcon = ({ width, height, onClick }: SVGIconProps) => {
	return (
		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 62.000000 62.000000"
			preserveAspectRatio="xMidYMid meet"
			onClick={onClick}
		>
			<g
				transform="translate(0.000000,62.000000) scale(0.100000,-0.100000)"
				fill="#000000"
				stroke="none"
			>
				<path
					d="M65 550 c-27 -29 -10 -74 28 -78 37 -4 57 13 57 49 0 47 -53 65 -85
29z"
				/>
				<path
					d="M320 561 c-98 -30 -192 -137 -158 -179 17 -21 200 -203 220 -220 20
-16 54 -4 102 39 43 38 73 91 82 147 20 129 -121 251 -246 213z"
				/>
				<path
					d="M156 278 l6 -63 -56 -43 c-31 -24 -56 -49 -56 -56 0 -15 48 -66 61
-66 11 0 37 26 74 74 l29 38 66 -6 65 -7 -95 96 c-52 52 -96 95 -98 95 -1 0 0
-28 4 -62z"
				/>
			</g>
		</svg>
	);
};

export default MatchingButtonIcon;
