import { TextInput, Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "./input.style";
import { useState } from "react";
import { IInputPasswordProps, IInputProps } from "./input.type";

function Input(props: IInputProps) {
	const { label, error, rightIcon, style, ...otherProps } = props;
	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={styles.inputWrapper}>
				<TextInput
					style={[
						styles.input,
						rightIcon ? styles.inputWithRightIcon : undefined,
						style,
					]}
					{...otherProps}
				/>
				{rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
			</View>

			{error && (
				<View style={styles.errorBlock}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	);
}

function Password(props: IInputPasswordProps) {
	const { label, error, style, ...otherProps } = props;

	const [hidden, setHidden] = useState(true);

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={styles.inputWrapper}>
				<TextInput
					style={[styles.input, styles.inputWithRightIcon, style]}
					{...otherProps}
					secureTextEntry={hidden}
				/>

				<TouchableOpacity
					style={styles.rightIcon}
					onPress={() => {
						setHidden(!hidden);
					}}
				>
					{hidden ? (
						<Image
							style={{ width: 20, height: 20 }}
							source={require("../images/close-eye.png")}
						/>
					) : (
						<Image
							style={{ width: 20, height: 20 }}
							source={require("../images/open-eye.png")}
						/>
					)}
				</TouchableOpacity>
			</View>

			{error && (
				<View style={styles.errorBlock}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	);
}

Input.Password = Password;

export { Input };
