import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function PencilIcon(props: SvgProps) {
    return (
        <Svg viewBox="0 0 16 16" {...props}>
            <Path
                d="M1.913 13.833H3.1l8.146-8.146L10.06 4.5l-8.146 8.146v1.187zM.246 15.5v-3.542l11-10.979c.167-.153.35-.27.553-.354C12 .542 12.212.5 12.434.5c.221 0 .437.042.645.125.21.083.39.208.542.375l1.146 1.167c.167.152.288.333.365.541a1.786 1.786 0 010 1.261 1.543 1.543 0 01-.365.552L3.787 15.5H.248zM10.642 5.104l-.583-.604 1.187 1.188-.604-.584z"
                fill="#070A1C"
            />
        </Svg>
    );
}

export default PencilIcon;
