import { View, Text, Image } from "react-native";
import { Input } from "../../shared/ui/input";
import { styles } from "./settings.styles";

export function Settings(){
    return (
        <View style={{gap: 8}}>
            <View style={styles.container}>
                <View style={styles.userInfoFirst}>
                    <Text style={styles.userInfoText}>Картка профілю</Text>
                    <Image source={require("../../shared/ui/images/pencil-in-circle.png")} style={styles.pencilImage}/>
                </View>

                <View style={{gap: 24, alignItems: "center"}}>
                    <Image source={require("../../shared/ui/images/avatar.png")} style={{width:96, height: 96}}/>
                    <View style={{gap:10, padding: 16}}>
                        <Text style={{fontSize: 24, color: "#070A1C", fontWeight: 700}}>Lina Li</Text> 
                        <Text style={{fontSize: 16, color: "#070A1C", fontWeight: 500}}>@thelili</Text> 
                    </View>
                    
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.userInfoFirst}>
                    <Text style={styles.userInfoText}>Особиста інформація</Text>
                    <Image source={require("../../shared/ui/images/pencil-in-circle.png")} style={styles.pencilImage}/>
                </View>
                <View>
                    <Input
								width={343}
								label="Ім'я"
								placeholder="Введіть ваше ім'я"
							/>
                    <Input
								width={343}
								label="Прізвище"
								placeholder="Введіть ваше прізвище"
							/>
                    <Input
								width={343}
								label="Дата народження"
								placeholder="Введіть вашу дату народження"
							/>
                    <Input
								width={343}
								label="Електронна адреса"
								placeholder="Введіть вашу електронну адресу"
							/>
                    <Input
								width={343}
								label="Пароль"
								placeholder="Введіть ваш пароль"
							/>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.userInfoFirst}>
                    <Text style={styles.userInfoText}>Варіанти підпису</Text>
                    <Image source={require("../../shared/ui/images/pencil-in-circle.png")} style={styles.pencilImage}/>
                </View>

                <View style={{gap: 24, padding: 16}}>
                    <View style={{gap: 16}}>
                        <Text style={{fontSize: 16, fontWeight: 500, color:"#543C52"}}>Ім'я та прізвище</Text>
                        <Text style={{fontSize: 16, fontWeight: 400, color:"#070A1C"}}>Lina Li</Text>
                    </View>

                    <View>
                        <Text style={{fontSize: 16, fontWeight: 500, color:"#543C52"}}>Мій електронний підпис</Text>
                    </View>
                    
                </View>
            </View>


        </View>
    )
}