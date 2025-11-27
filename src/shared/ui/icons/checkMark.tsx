import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CheckMarkIcon(props: SvgProps) {
    return (
        <Svg viewBox="0 0 11 10" {...props} fill={"none"}>
            <Path
                d="M9.414 1.875l-5.25 6.25-2.25-2.5"
                stroke="#81818D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    );
}

export default CheckMarkIcon;
