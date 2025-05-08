import { TouchableOpacity, Text } from "react-native";
import { IButtonProps } from "./button.types";
import { styles } from "./button.styles"


export function Button(props: IButtonProps){

    const { label, disabled } = props
    return (
        <TouchableOpacity
            style={styles.button} 
            disabled={disabled}
            {...props}
            
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}