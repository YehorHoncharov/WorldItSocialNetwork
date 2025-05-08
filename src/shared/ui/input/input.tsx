import { TextInput, Text, View, TouchableOpacity } from "react-native"
import { styles } from "./input.style"
import { useState } from "react";
import OpenEyeIcon from "../icons/main-logo-open-eye";
import CloseEyeIcon from "../icons/main-logo-close-eye";
import { IInputPasswordProps, IInputProps } from "./input.type";

function Input(props: IInputProps) {
    const { label, error, rightIcon, style, ...otherProps } = props
    return (
        <View style={styles.inputContainer}>

            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputWrapper} >

                <TextInput
                    style={[
                        styles.input,
                        rightIcon ? styles.inputWithRightIcon : undefined,
                        style
                    ]}
                    {...otherProps}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            
            {error &&
                <View style={styles.errorBlock}>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            }

        </View>
    );
}

function Password(props: IInputPasswordProps) {
    const { label, error, style, ...otherProps } = props

    const [hidden, setHidden] = useState(true)

    return (
        <View style={styles.inputContainer}>

            {label && <Text style={styles.label}>{label}</Text>}
            
            <View style={styles.inputWrapper} >

                <TextInput
                    style={[
                        styles.input,
                        styles.inputWithRightIcon,
                        style
                    ]}
                    {...otherProps}
                    secureTextEntry={hidden}
                /> 
                
                <TouchableOpacity style={styles.rightIcon} onPress={() => {
                        setHidden(!hidden)
                    }}>
                    { hidden ? <CloseEyeIcon width={30} height={30}/> : <OpenEyeIcon width={30} height={30}/>}
                </TouchableOpacity> 
            </View>
                    
            {error &&
                <View style={styles.errorBlock}>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            }

        </View>
    );
}

Input.Password = Password

export { Input }