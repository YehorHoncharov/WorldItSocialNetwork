import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function OrangeTriangleIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 27 29" {...props}>
      <Path
              d="M26.067 4.135L22.8 25.614c-.425 2.796-4.128 3.504-5.556 1.063l-3.513-6.012a3 3 0 00-2.07-1.44l-8.486-1.496c-2.765-.487-3.406-4.166-.968-5.56L21.612 1.08c2.179-1.245 4.832.575 4.455 3.056z"
        fill="#FF3900"
      />
    </Svg>
  )
}

export default OrangeTriangleIcon
