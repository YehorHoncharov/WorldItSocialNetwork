import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SendArrow(props: SvgProps) {
    return (
        <Svg viewBox="0 0 17 19" {...props}>
            <Path
                d="M15.8 8.13L2.67.638A1.562 1.562 0 00.43 2.518L2.79 9.499.431 16.48a1.563 1.563 0 002.24 1.88l.006-.005 13.125-7.505a1.563 1.563 0 000-2.72H15.8zM2.465 16.316l1.986-5.88h4.327a.938.938 0 000-1.875H4.452l-1.987-5.88 11.934 6.81-11.933 6.825z"
                fill="#fff"
            />
        </Svg>
    );
}

export default SendArrow;
