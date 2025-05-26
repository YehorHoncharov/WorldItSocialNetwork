import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function TrashIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 16 18"
      {...props}
    >
      <Path
        d="M.969 4.833h13.333M5.97 8.167v5m3.333-5v5m-7.5-8.334l.833 10A1.666 1.666 0 004.302 16.5h6.667a1.667 1.667 0 001.666-1.667l.834-10m-8.334 0v-2.5A.833.833 0 015.97 1.5h3.333a.833.833 0 01.833.833v2.5"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
        fill={"#543C52"}
      />
    </Svg>
  )
}

