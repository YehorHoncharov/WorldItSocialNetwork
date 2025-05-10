import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function I(props: SvgProps) {
	return (
		<Svg viewBox="0 0 6 16" {...props}>
			<Path d="M5.177.382v15.22h-4.3V.381h4.3z" fill="#F98232" />
		</Svg>
	);
}

export default I;
