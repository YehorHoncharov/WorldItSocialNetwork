import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function RectanglePInkIcon(props:SvgProps) {
  return (
    <Svg viewBox="0 0 35 28" {...props} >
      <Path
        d="M3.845 9.103a3.785 3.785 0 012.383-2.145l19.219-5.855c2-.61 4.115.518 4.724 2.518l4.013 13.174c.61 2-.518 4.115-2.518 4.724l-19.218 5.855a3.785 3.785 0 01-3.174-.452L1.76 22.013a3.785 3.785 0 01-1.416-4.646l3.501-8.264z"
        fill="#FF8FB1"
      />
    </Svg>
  )
}

export default RectanglePInkIcon