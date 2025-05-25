import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { Providers } from "../providers";
import { Header } from "../../shared/ui/header/header";
import Post from "../../modules/post/ui/main-page/main.page";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function MyPublications() {

    const {top} = useSafeAreaInsets()

    return (
        <Providers>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ScrollView
                    overScrollMode="never"
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: "center",
                        backgroundColor: "#FAF8FF",
                        gap: 10,
                        paddingTop: 10,
                    }}
                >
            
                </ScrollView>
            </SafeAreaView>
        </Providers>
    );
}
