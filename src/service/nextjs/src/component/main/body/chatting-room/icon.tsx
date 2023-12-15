interface IconProps {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}

export const ParticipantIcon = ({ width, height, onClick }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 25 16"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M17.0455 6.85714C18.9318 6.85714 20.4432 5.32571 20.4432 3.42857C20.4432 1.53143 18.9318 0 17.0455 0C15.1591 0 13.6364 1.53143 13.6364 3.42857C13.6364 5.32571 15.1591 6.85714 17.0455 6.85714ZM7.95455 6.85714C9.84091 6.85714 11.3523 5.32571 11.3523 3.42857C11.3523 1.53143 9.84091 0 7.95455 0C6.06818 0 4.54545 1.53143 4.54545 3.42857C4.54545 5.32571 6.06818 6.85714 7.95455 6.85714ZM7.95455 9.14286C5.30682 9.14286 0 10.48 0 13.1429V16H15.9091V13.1429C15.9091 10.48 10.6023 9.14286 7.95455 9.14286ZM17.0455 9.14286C16.7159 9.14286 16.3409 9.16572 15.9432 9.2C17.2614 10.16 18.1818 11.4514 18.1818 13.1429V16H25V13.1429C25 10.48 19.6932 9.14286 17.0455 9.14286Z"
				fill="black"
			/>
		</svg>
	);
};

export const ChatIcon = ({ width, height, onClick }: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 47 47"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			onClick={onClick}
		>
			<rect width="47" height="47" fill="url(#pattern0)" />
			<defs>
				<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlinkHref="#image0_45_87" transform="scale(0.0104167)" />
				</pattern>
				<image
					id="image0_45_87"
					width="96"
					height="96"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACcklEQVR4nO2cMW4UQRBFf2KTOHboGMwBQBwIcwMkEpyDl0W+BTcAjmE7dewU24EtkD5aqZFIrFmYLv+umv+kSndX/01Xt6Z2BjDGGGOMMcYYY4wx5mGeA/gE4BzALQAOXrftt64AHGYWuwvgFMCvAULlf9bmt38GsIOE4X8fIEB2qm/ZJJwOEBo71xqJen7mtsMH6ieAZ0jAeoCwGFQnSMDFAEExqM6QgJsBgmJQXSMBLF7Dow6IFqAPiV4B+qDoFlSzhkcdEC1AHxK9AvRB0S2oZg2POiBagD4kegXog6JbUM2aQj5zVgfEwQWEz5zVATGRgJCZszogJhTQdeasDohJBXSbOasDYlIB3WbO6oCYWECXmbM6ICYW0GXmrA6IiQVs8/kWMIEFwCtA3iboFqQPit4DatYU3gNgAfKrlF4BNevHRPt54haEUAFTtwr2LQChAj5MCHhpAQgLf3O7+OmEgCMLQJiAzQx3ii8WgJDwv24xMtzr9CD6bFis7ay2nNe+7vSdixdw0047H/9hRLg5fl5mFHCMGrzruOpms+0XvUcNXgG4yyagSvgHAK467zuzWUrbOWh/MWQmAZXazlVA+KECKlz5u23DvQ8KP0xA9vD32jm/11HzUQUcJ7zK9wG8APCm3V54zFetzSa657N4dQsoasNl8eoSUORph8VrNtE9n8VreK4HCGnRAs4HCGnRAlYDhLRoAYdFX4uZRgDao53qoBYtYKc92qkOa7EC/khYt7mtOrRFCvh7Tzhpc9wK7yw1nXlrAbkkGLEEI5ZgxBKMWIIRSzBiCUYswYglGLEEIyTbf6iMMcYYY4wxiOc3wv2yvvDjEnIAAAAASUVORK5CYII="
				/>
			</defs>
		</svg>
	);
};
