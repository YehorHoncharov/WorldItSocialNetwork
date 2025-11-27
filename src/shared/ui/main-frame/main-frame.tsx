import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, View, Image, Text } from "react-native";
import { styles } from "./main-frame.styles";
import W from "../icons/logo-orange/w";
import O from "../icons/logo-orange/o";
import R from "../icons/logo-orange/r";
import L from "../icons/logo-orange/l";
import D from "../icons/logo-orange/d";
import I from "../icons/logo-orange/i";
import T from "../icons/logo-orange/t";

export function MainFrame() {
    const router = useRouter();
    function onPress() {
        router.navigate("/home");
    }
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.contsiner}>
                <View style={styles.up}>
                    <Image
                        style={styles.worldItLogo}
                        source={require("../../ui/images/world-it-logo-orange.png")}
                    />
                    <View style={{ flexDirection: "row", gap: 1, paddingRight: 8 }}>
                        <W style={styles.w} />
                        <O style={styles.o} />
                        <R style={styles.r} />
                        <L style={styles.l} />
                        <D style={styles.d} />
                    </View>
                    <View style={{ flexDirection: "row", gap: 2, paddingTop: 8 }}>
                        <I style={styles.i} />
                        <T style={styles.t} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Соціальна мережа</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
