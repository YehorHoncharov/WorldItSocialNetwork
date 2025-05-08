import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function W(props: SvgProps) {
  return (
    <Svg 
      viewBox="0 0 23 16"
      {...props}
    >
      <Path
        d="M.043.382h4.3L6.36 10.798 8.137 3.23C8.642 1.006 9.738.045 11.427.045c1.688 0 2.768.944 3.29 3.185l1.775 7.568L18.512.382h4.299l-2.803 12.742c-.4 1.82-1.653 2.848-3.36 2.848-1.705 0-2.906-.995-3.306-2.663l-1.933-8.225-1.932 8.225c-.4 1.668-1.775 2.663-3.307 2.663s-2.96-1.011-3.36-2.848L.008.382h.035z"
        fill= "#543C52"
      />
    </Svg>
  )
}

export default W
