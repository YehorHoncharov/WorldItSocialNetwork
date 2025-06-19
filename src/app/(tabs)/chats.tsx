import { View, Alert, ScrollView, Dimensions, Animated } from "react-native";
import { useUserContext } from "../../modules/auth/context/user-context";
import {ContactsScreen} from "../../modules/chat/ui/contacts/contacts";
import { useRef, useState } from "react";
import { ChatHeader } from "../../modules/chat/ui/chat-header/chat-header";
import { RecomendFriends } from "../../modules/friends/ui/recomend/recomend";
import { AllFriends } from "../../modules/friends/ui/all/all";

const screenWidth = Dimensions.get("window").width;

export default function Chats() {
    // const {user} = useUserContext()
    // if (!user){
    //     Alert.alert("Будь ласка, зареєструйтесь")
    //     return
    // } 
    const [activeTab, setActiveTab] = useState('contacts');
    const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab: string) => {
    if (tab === 'contacts') {
      setActiveTab('contacts');
      return;
    }

    let toValue = 0;
    switch (tab) {
      case 'contacts': toValue = 0; break;
      case 'messages': toValue = -screenWidth; break;
      case 'chat-group': toValue = -screenWidth * 2; break;
    }

    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setActiveTab(tab);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ChatHeader activeTab={activeTab} onTabPress={handleTabPress} />

      {activeTab === 'contacts' ? (
        <ScrollView contentContainerStyle={{alignItems:"center", gap: 10}} overScrollMode="never">
          <ContactsScreen scrollable={true} />
          <RecomendFriends scrollable={true} />
          <AllFriends scrollable={true} />
        </ScrollView>
      ) : (
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <Animated.View style={{
            flexDirection: 'row',
            width: screenWidth * 3,
            transform: [{ translateX }],
          }}>
            <ScrollView style={{ width: screenWidth }} overScrollMode="never">
              <ContactsScreen />
            </ScrollView>
            <ScrollView style={{ width: screenWidth }} overScrollMode="never">
              <RecomendFriends />
            </ScrollView>
            <ScrollView style={{ width: screenWidth }} overScrollMode="never">
              <AllFriends />
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </View>
  );
        
    // return (
    //     <View style={{ flex: 1 }}>
            
    //         <ContactsScreen/>
    //     </View>
    // )
}

