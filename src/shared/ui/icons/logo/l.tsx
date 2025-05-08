import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function L(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 12 16"
      {...props}
    >
      <Path
        d="M4.735 11.758h6.945v3.826H4.16c-2.646 0-3.725-1.348-3.725-3.489V.383h4.3v11.376z"
        fill= "#543C52"
      />
    </Svg>
  )
}

export default L
