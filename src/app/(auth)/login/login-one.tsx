import { router } from "expo-router"
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Button } from "../../../shared/ui/button"
import {LoginFormOne} from "../../../modules/auth/ui/login-form-one"
import GoBackArrowIcon from "../../../shared/ui/icons/go-back-arrow"
import { COLORS } from "../../../shared/ui/colors"

export default function LoginOne(){
    function onPress(){
        router.back()
    }
    
    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{
					flex: 1,
				}}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 25,
                            paddingLeft: 10
                        }}
                        onPress={() => onPress()}
                        >
                        <GoBackArrowIcon width={25} height={20} />
                        <Text style={{ color: COLORS.purple, fontSize: 16 }}>Go back</Text>
                    </TouchableOpacity>
                    <LoginFormOne/>
            </ScrollView>
        </SafeAreaView>
    )
}