import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

export function ChatGroupIcon(props: SvgProps) {
    return (
        <Svg viewBox="0 0 256 256" {...props}>
            <G
                stroke="none"
                strokeWidth={0}
                strokeDasharray="none"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit={10}
                fill="none"
                fillRule="nonzero"
                opacity={1}
            >
                <Path
                    d="M0 71.92l6.391-19.542a33.693 33.693 0 01-4.245-16.391c0-18.631 15.157-33.788 33.788-33.788s33.788 15.157 33.788 33.788-15.158 33.788-33.789 33.788a33.697 33.697 0 01-16.392-4.245L0 71.92zm20.511-14.722l1.514.952a26.08 26.08 0 0013.909 4.006c14.43 0 26.169-11.739 26.169-26.169S50.363 9.818 35.933 9.818 9.764 21.557 9.764 35.987c0 4.933 1.386 9.743 4.007 13.909l.952 1.513-2.813 8.602 8.601-2.813z"
                    transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                    stroke="none"
                    strokeWidth={1}
                    strokeDasharray="none"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit={10}
                    fill="#000"
                    fillRule="nonzero"
                    opacity={1}
                />
                <Path
                    d="M39.52 35.987a3.586 3.586 0 11-7.172 0 3.586 3.586 0 017.172 0zM25.893 35.987a3.586 3.586 0 11-7.172 0 3.586 3.586 0 017.172 0zM53.147 35.987a3.586 3.586 0 11-7.172 0 3.586 3.586 0 017.172 0zM83.61 70.511a33.688 33.688 0 004.245-16.391c0-10.449-4.768-19.803-12.242-26.006a40.455 40.455 0 01.562 12.03 26.01 26.01 0 014.061 13.976c0 4.933-1.386 9.742-4.006 13.909l-.952 1.513 2.813 8.602-8.602-2.813-1.513.952a26.087 26.087 0 01-13.909 4.006 26.01 26.01 0 01-13.976-4.061c-1.367.14-2.754.213-4.157.213a40.4 40.4 0 01-7.888-.793c6.203 7.484 15.564 12.26 26.021 12.26a33.685 33.685 0 0016.391-4.245L90 90.053l-6.39-19.542z"
                    transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                    stroke="none"
                    strokeWidth={1}
                    strokeDasharray="none"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit={10}
                    fill="#000"
                    fillRule="nonzero"
                    opacity={1}
                />
            </G>
        </Svg>
    );
}
