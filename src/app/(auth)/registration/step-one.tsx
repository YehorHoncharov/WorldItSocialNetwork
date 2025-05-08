import { RegFormOne } from "../../../modules/auth/ui/reg-form-one";
import {SafeAreaView, ScrollView, Text, View} from 'react-native'
import { Providers } from "../../providers";
import { Link } from "expo-router";
import { COLORS } from "../../../shared/ui/colors";

export default function Register(){
    return(
        <Providers>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView contentContainerStyle={{
					flexGrow: 1,
					alignItems: "center",
				}}>
                    <RegFormOne></RegFormOne>
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Text>Don't have an account?</Text>
                        <Link href={"/login/login-one"} style={{color: COLORS.purple}}>Login now</Link>
                    </View>
                </ScrollView>
            
            </SafeAreaView>
        </Providers>
        
        
    )
}

