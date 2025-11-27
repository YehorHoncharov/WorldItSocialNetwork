import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Publication(props) {
    return (
        <Svg
            width={21}
            height={20}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M2.47 5a3.333 3.333 0 013.334-3.333h10A3.334 3.334 0 0119.136 5v10a3.333 3.333 0 01-3.334 3.333h-10A3.333 3.333 0 012.47 15V5z"
                stroke="color(display-p3 .0275 .0392 .1098)"
                strokeWidth={1.66667}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
            <Path
                d="M7.887 9.167a2.083 2.083 0 100-4.167 2.083 2.083 0 000 4.167zM12.909 10.518l-7.105 7.815h10.11a3.223 3.223 0 003.223-3.222V15c0-.39-.146-.538-.408-.826l-3.359-3.662a1.665 1.665 0 00-2.461.005z"
                stroke="color(display-p3 .0275 .0392 .1098)"
                strokeWidth={1.66667}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    );
}

export default Publication;
