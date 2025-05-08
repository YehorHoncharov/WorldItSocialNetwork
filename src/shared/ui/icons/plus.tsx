import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function PlusIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 34 33"
      {...props}
    >
      <Path
        d="M17 0a16.5 16.5 0 1016.5 16.5A16.518 16.518 0 0017 0zm0 29.333A12.833 12.833 0 1129.833 16.5 12.847 12.847 0 0117 29.333zM24.944 16.5a1.834 1.834 0 01-1.833 1.833h-4.278v4.278a1.833 1.833 0 11-3.666 0v-4.278h-4.278a1.833 1.833 0 110-3.666h4.278v-4.278a1.833 1.833 0 113.666 0v4.278h4.278a1.833 1.833 0 011.833 1.833z"
        fill="#4B56D2"
      />
    </Svg>
  )
}

export default PlusIcon
