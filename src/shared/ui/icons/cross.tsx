import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function Cross(props: SvgProps) {
    return (
        <Svg viewBox="0 0 13 13" {...props}>
            <Path d="M10.293 11.853L6.47 8.028l-3.825 3.825a1.082 1.082 0 01-1.53-1.53L4.94 6.498 1.114 2.674a1.082 1.082 0 011.53-1.53L6.47 4.97l3.824-3.825a1.082 1.082 0 011.53 1.53L7.999 6.498l3.824 3.825a1.082 1.082 0 11-1.53 1.53z" />
        </Svg>
    );
}

export default Cross;
