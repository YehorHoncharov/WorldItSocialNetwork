import { TouchableOpacityProps } from "react-native"

export interface IButtonProps extends TouchableOpacityProps {
    label: string
    disabled?: boolean
}