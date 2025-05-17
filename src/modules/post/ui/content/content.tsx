import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./content.styles";
import Like from "../../../../shared/ui/icons/like";
import { usePosts } from "../../hooks/use-get-post";
import { IPost } from "../../types/post";

export function Content(props:IPost) {

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={{ fontSize: 14 }}>
					{props.text}
				</Text>
				<Text style={{ fontSize: 14 }}>
					{props.tags}
				</Text>
			</View>
			<View style={styles.imageCont}>
				{/* <Image
					style={styles.imageLarge}
					source={require("./../../../../shared/ui/images/picture-one.png")}
				/>
				<Image
					style={styles.imageLarge}
					source={require("./../../../../shared/ui/images/picture-two.png")}
				/>
				<Image
					style={styles.imageSmall}
					source={require("./../../../../shared/ui/images/picture-three.png")}
				/>
				<Image
					style={styles.imageSmall}
					source={require("./../../../../shared/ui/images/picture-four.png")}
				/>
				<Image
					style={styles.imageSmall}
					source={require("./../../../../shared/ui/images/picture-five.png")}
				/> */}
				
				{/* {props.images.map((image) => (
					<Image
						key={image.id}
						style={styles.imageLarge}
						source={{ uri: image.url }}
					/>
				))} */}
			</View>

			<View
				style={{
					flexDirection: "row",
					gap: 24,
					alignSelf: "flex-start",
					paddingLeft: 16,
				}}
			>
				<View style={styles.postButs}>
					<TouchableOpacity>
						<Like width={20} height={20} />
					</TouchableOpacity>
					<Text style={{ fontSize: 14 }}>120 Вподобань</Text>
				</View>
				<View style={styles.postButs}>
					<TouchableOpacity>
						<Image
							style={{ width: 20, height: 20 }}
							source={require("./../../../../shared/ui/images/eye.png")}
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 14 }}>890 Переглядів</Text>
				</View>
			</View>
		</View>
	);
}
