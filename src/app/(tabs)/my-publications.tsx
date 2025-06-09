import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import  Providers from "../providers";
import { AlbumHeader } from "../../modules/albums/ui/my/album-header/album-header";




export default function MyPublications() {



    return (
        <Providers>
        
            <SafeAreaView style={{ flex: 1, backgroundColor: "#E9E5EE" }}>
                <AlbumHeader/>
                {/* <ScrollView
                    overScrollMode="never"
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: "center",
                        backgroundColor: "#FAF8FF",
                        gap: 10,
                        paddingTop: 10,
                    }}
                >
            
                </ScrollView> */}
            </SafeAreaView>
        </Providers>
    );
}
