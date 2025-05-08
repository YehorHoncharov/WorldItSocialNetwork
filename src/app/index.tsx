import { Redirect, useRouter } from "expo-router";
import { TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet, Text, Image, ImageProps } from "react-native";

export default function Index(){
  const router = useRouter()
  function onPress(){
    router.navigate("/main-page")
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.contsiner}>
          <Image style={styles.image} source={require("../shared/ui/images/main-frame.png")}/>
      </View>
    </TouchableWithoutFeedback>
  )
}



const styles = StyleSheet.create({
  contsiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D2D1E8"
  },
  image: {
    width:330,
    height: 330,
  }
})