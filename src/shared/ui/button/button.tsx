import { TouchableOpacity, Text, Image } from "react-native";
import { IButtonProps } from "./button.types";
import { styles } from "./button.styles"


export function Button(props: IButtonProps){

    const { label, disabled, icon } = props
    return (
        <TouchableOpacity
            style={styles.button} 
            disabled={disabled}
            {...props}
            
        >
            <Text style={styles.text}>{label}</Text>
            {icon && (
                <Image
                    style={styles.icon}
                    source={typeof icon === "string" ? { uri: icon } : icon}
                />
            )}
        </TouchableOpacity>
    )
}