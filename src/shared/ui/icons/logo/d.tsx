import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function D(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        d="M7 15.601H.786V.382H7c5.153 0 8.565 3.05 8.565 7.669 0 4.617-3.534 7.55-8.565 7.55zM7 4.208H5.086v7.668H7c2.507 0 4.143-1.533 4.143-3.825 0-2.293-1.636-3.826-4.143-3.826v-.017z"
        fill= "#543C52"
      />
    </Svg>
  )
}

export default D
