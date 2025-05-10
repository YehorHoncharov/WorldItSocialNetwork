import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function T(props: SvgProps) {
	return (
		<Svg viewBox="0 0 14 16" {...props}>
			<Path
				d="M13.6 4.208H9.16v11.376H4.862V4.208H.422V.382h13.195v3.826h-.018z"
				fill="#F98232"
			/>
		</Svg>
	);
}

export default T;
