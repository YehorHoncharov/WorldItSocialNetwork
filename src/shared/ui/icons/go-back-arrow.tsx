import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function GoBackArrowIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 11 18"
      {...props}
    >
      <Path
        d="M9.866 17.82l.945-.902a.558.558 0 00.189-.415.558.558 0 00-.19-.414L3.384 9l7.428-7.088A.558.558 0 0011 1.497a.557.557 0 00-.19-.415L9.867.18a.61.61 0 00-.87 0L.5 8.5c-.126.12-.311.344-.311.5 0 .156.185.38.311.5l8.496 8.32a.611.611 0 00.87 0z"
        fill="#4B56D2"
      />
    </Svg>
  )
}

export default GoBackArrowIcon
