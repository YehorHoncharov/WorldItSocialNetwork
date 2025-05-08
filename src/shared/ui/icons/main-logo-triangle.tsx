import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function TriangleIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 16 15" {...props}>
      <Path d="M15.938 14.696L.58 11.625 13.25.107l2.687 14.59z" fill="#fff" />
    </Svg>
  )
}

export default TriangleIcon