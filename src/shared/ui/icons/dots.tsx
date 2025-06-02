import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Dots(props: SvgProps) {
	return (
		<Svg viewBox="0 0 5 18" {...props}>
			<Path
				d="M4.658 9A2.187 2.187 0 11.283 9a2.187 2.187 0 014.375 0zM2.47 4.937a2.187 2.187 0 100-4.374 2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.375 2.187 2.187 0 000-4.375z"
				fill="#81818D"
			/>
		</Svg>
	);
}

export default Dots;
