import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function R(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 15 16"
      {...props}
    >
      <Path
        d="M.881 15.601V.382H7.48c3.725 0 6.562 1.685 6.562 5.056s-1.166 3.657-3.011 4.214c.783.488 1.305 1.382 2.001 2.747l1.602 3.202H9.95l-1.462-2.865c-.54-1.045-1.149-1.416-2.541-1.416h-.784v4.281H.881zm4.3-11.393v3.404h2.28c1.253 0 2.141-.674 2.141-1.752 0-1.08-.888-1.652-2.089-1.652H5.181z"
        fill= "#543C52"
      />
    </Svg>
  )
}

export default R
