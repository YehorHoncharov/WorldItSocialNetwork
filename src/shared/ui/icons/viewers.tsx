import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

function Viewers(props: SvgProps) {
  return (
    <Svg viewBox="0 0 21 20" {...props}>
      <G
        clipPath="url(#clip0_55_2723)"
        stroke="#81818D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <Path d="M2.137 10s2.5-5.833 8.333-5.833S18.803 10 18.803 10s-2.5 5.833-8.333 5.833S2.137 10 2.137 10z" />
        <Path d="M10.47 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </G>
      <Defs>
        <ClipPath id="clip0_55_2723">
          <Path fill="#fff" transform="translate(.47)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Viewers;