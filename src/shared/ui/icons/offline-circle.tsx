import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

function OfflineIcon(props: SvgProps) {
    return (
        <Svg width={23} height={23} viewBox="0 0 23 23" fill="none" {...props}>
            <Rect
                x={1.375}
                y={1.375}
                width={20.25}
                height={20.25}
                rx={10.125}
                fill="grey"
                fillOpacity={1}
            />
            <Rect
                x={1.375}
                y={1.375}
                width={20.25}
                height={20.25}
                rx={10.125}
                stroke="#fff"
                strokeWidth={2.25}
                strokeOpacity={1}
            />
        </Svg>
    );
}

export default OfflineIcon;
