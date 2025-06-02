import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./album.style";
import Dots from "../../../../shared/ui/icons/dots";

export function Album() {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={{gap:27}}>
                    <View style={{gap: 16}}>
                        <View style={styles.mainBox}>
                            <Text style={styles.title}>Настрій</Text>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Image
                                        source={require("../../../../shared/ui/images/eye-my-publication.png")}
                                        style={styles.actionIcon}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={{alignItems: "center", justifyContent: "center"}}>
                                    <Dots width={20} height={20} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.theme}>
                            <Text style={{fontSize: 16}}>Природа</Text>
                            <Text style={{fontSize: 16}}>2025 рік</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>

                    <View style={{gap:16}}>
                        <Text style={styles.title}>Фотографії</Text>
                        <TouchableOpacity style={styles.addImage}>
                            <Image style={{ width: 40.6, height: 40 }} source={require('../../../../shared/ui/images/plus-in-circle.png')}>
								
							</Image>
                        </TouchableOpacity>
                    </View>
                </View>
			</ScrollView>
		</View>
	);
}
