// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { Input } from "../../shared/ui/input";
// import { styles } from "./settings.styles";
// import { useUserContext } from "../auth/context/user-context";
// import { useRouter } from "expo-router";

// import { useState } from "react";

// export function Settings() {
// 	const { user } = useUserContext();
// 	const router = useRouter();
// 	const [isDrawing, setIsDrawing] = useState(false);

// 	function handlePress() {
// 		router.navigate("/registration/step-one");
// 	}

// 	if (!user) {
// 		return (
// 			<View
// 				style={[
// 					styles.container,
// 					{ justifyContent: "center", alignItems: "center", flex: 1 },
// 				]}
// 			>
// 				<Text
// 					style={{
// 						fontSize: 18,
// 						textAlign: "center",
// 						marginBottom: 20,
// 					}}
// 				>
// 					Ви не авторизовані
// 				</Text>
// 				<TouchableOpacity
// 					style={styles.authButton}
// 					onPress={handlePress}
// 				>
// 					<Text style={styles.authButtonText}>
// 						Увійти або зареєструватись
// 					</Text>
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	}

// 	return (
// 		<View style={{ gap: 8 }}>
// 			<View style={styles.container}>
// 				<View style={styles.userInfoFirst}>
// 					<Text style={styles.userInfoText}>Картка профілю</Text>
// 					<Image
// 						source={require("../../shared/ui/images/pencil-in-circle.png")}
// 						style={styles.pencilImage}
// 					/>
// 				</View>

// 				<View style={{ gap: 24, alignItems: "center" }}>
// 					<Image
// 						source={require("../../shared/ui/images/avatar.png")}
// 						style={{ width: 96, height: 96 }}
// 					/>
// 					<View style={{ gap: 10, padding: 16 }}>
// 						<Text
// 							style={{
// 								fontSize: 24,
// 								color: "#070A1C",
// 								fontWeight: 700,
// 							}}
// 						>
// 							Lina Li
// 						</Text>
// 						<Text
// 							style={{
// 								fontSize: 16,
// 								color: "#070A1C",
// 								fontWeight: 500,
// 							}}
// 						>
// 							@thelili
// 						</Text>
// 					</View>
// 				</View>
// 			</View>

// 			<View style={styles.container}>
// 				<View style={styles.userInfoFirst}>
// 					<Text style={styles.userInfoText}>Особиста інформація</Text>
// 					<Image
// 						source={require("../../shared/ui/images/pencil-in-circle.png")}
// 						style={styles.pencilImage}
// 					/>
// 				</View>
// 				<View>
// 					<Input
// 						width={343}
// 						label="Ім'я"
// 						placeholder="Введіть ваше ім'я"
// 					/>
// 					<Input
// 						width={343}
// 						label="Прізвище"
// 						placeholder="Введіть ваше прізвище"
// 					/>
// 					<Input
// 						width={343}
// 						label="Дата народження"
// 						placeholder="Введіть вашу дату народження"
// 					/>
// 					<Input
// 						width={343}
// 						label="Електронна адреса"
// 						placeholder="Введіть вашу електронну адресу"
// 					/>
// 					<Input
// 						width={343}
// 						label="Пароль"
// 						placeholder="Введіть ваш пароль"
// 					/>
// 				</View>
// 			</View>

// 			<View style={styles.container}>
//   <View style={styles.userInfoFirst}>
//     <Text style={styles.userInfoText}>Варіанти підпису</Text>
//     <Image source={require("../../shared/ui/images/pencil-in-circle.png")} style={styles.pencilImage}/>
//   </View>

//   <View style={{gap: 24, padding: 16}}>
//     <View style={{gap: 16}}>
//       <Text style={{fontSize: 16, fontWeight: 500, color:"#543C52"}}>Ім'я та прізвище</Text>
//       <Text style={{fontSize: 16, fontWeight: 400, color:"#070A1C"}}>Lina Li</Text>
//     </View>

//     <View style={{ height: 250 }}>
//       <SignatureScreen
//         onBegin={() => setIsDrawing(true)}
//         onEnd={() => setIsDrawing(false)}
//         webStyle={`
//           .m-signature-pad { 
//             height: 100%; 
//             width: 100%; 
//             background: #FFF;
//           }
//           body { overflow: hidden; }
//         `}
//       />
//     </View>
//   </View>
// </View>
// 		</View>
// 	);
// }

import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Input } from "../../shared/ui/input";
import { styles } from "./settings.styles";
import { useUserContext } from "../auth/context/user-context";
import { useRouter } from "expo-router";

import { useRef, useState } from "react";
import { SignaturePad, SignaturePadRef } from "./signature/signature";

export function Settings() {
  const { user } = useUserContext();
  const router = useRouter();
  const [isDrawing, setIsDrawing] = useState(false);
  const signatureRef = useRef<SignaturePadRef>(null);

  function handlePress() {
    router.navigate("/registration/step-one");
  }

  const handleSignatureSave = (signature: string) => {
    console.log("Signature saved:", signature);
  };

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
          Ви не авторизовані
        </Text>
        <TouchableOpacity 
          style={styles.authButton}
          onPress={handlePress}
        >
          <Text style={styles.authButtonText}>Увійти або зареєструватись</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 30 }}
      scrollEnabled={!isDrawing}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ gap: 8 }}>
        {/* Profile Card Section */}
        <View style={styles.container}>
          <View style={styles.userInfoFirst}>
            <Text style={styles.userInfoText}>Картка профілю</Text>
            <Image 
              source={require("../../shared/ui/images/pencil-in-circle.png")} 
              style={styles.pencilImage}
            />
          </View>

          <View style={{ gap: 24, alignItems: "center" }}>
            <Image 
              source={require("../../shared/ui/images/avatar.png")} 
              style={{ width: 96, height: 96 }}
            />
            <View style={{ gap: 10, padding: 16 }}>
              <Text style={{ fontSize: 24, color: "#070A1C", fontWeight: "700" }}>Lina Li</Text> 
              <Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500" }}>@thelili</Text> 
            </View>
          </View>
        </View>

        {/* Personal Information Section */}
        <View style={styles.container}>
          <View style={styles.userInfoFirst}>
            <Text style={styles.userInfoText}>Особиста інформація</Text>
            <Image 
              source={require("../../shared/ui/images/pencil-in-circle.png")} 
              style={styles.pencilImage}
            />
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
              secureTextEntry
            />
          </View>
        </View>

        {/* Signature Options Section */}
        <View style={styles.container}>
          <View style={styles.userInfoFirst}>
            <Text style={styles.userInfoText}>Варіанти підпису</Text>
            <Image 
              source={require("../../shared/ui/images/pencil-in-circle.png")} 
              style={styles.pencilImage}
            />
          </View>

          <View style={{ gap: 24, padding: 16 }}>
            <View style={{ gap: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#543C52" }}>
                Ім'я та прізвище
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "400", color: "#070A1C" }}>
                Lina Li
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#543C52", marginBottom: 10 }}>
                Мій електронний підпис
              </Text>
              <SignaturePad 
                ref={signatureRef}
                onSave={handleSignatureSave}
                onDrawingStart={() => setIsDrawing(true)}
                onDrawingEnd={() => setIsDrawing(false)}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}