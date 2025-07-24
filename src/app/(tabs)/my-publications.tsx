import { SafeAreaView, StatusBar, View } from "react-native";
import Providers from "../providers";
import { MyPublications } from "../../modules/my_publications/my-publications";

export default function MyPublication() {

    return (
        <Providers>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF8FF" }}>
                <MyPublications />
            </SafeAreaView>
        </Providers>
    );
}
