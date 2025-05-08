import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function O(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 18 16"
      {...props}
    >
      <Path
        d="M.733 8C.733 3.466 4.267.062 9.02.062S17.305 3.466 17.305 8s-3.534 7.938-8.286 7.938S.733 12.534.733 8zm12.168 0c0-2.258-1.671-3.994-3.864-3.994-2.194 0-3.865 1.736-3.865 3.994s1.671 3.994 3.865 3.994c2.193 0 3.864-1.736 3.864-3.994z"
        fill= "#543C52"
      />
    </Svg>
  )
}

export default O
