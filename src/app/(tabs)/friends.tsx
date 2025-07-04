import { ScrollView, View, Animated, Dimensions } from "react-native";
import { useRef, useState } from "react";
import { FriendsHeader } from "../../modules/friends/ui/friends-header/friends-header";
import { RequestsFriends } from "../../modules/friends/ui/requests/requests";
import { RecomendFriends } from "../../modules/friends/ui/recomend/recomend";
import { AllFriends } from "../../modules/friends/ui/all/all";

const screenWidth = Dimensions.get("window").width;

export default function Friends() {
  const [activeTab, setActiveTab] = useState('main');
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab: string) => {
    if (tab === 'main') {
      setActiveTab('main');
      return;
    }

    let toValue = 0;
    switch (tab) {
      case 'requests': toValue = 0; break;
      case 'recommendations': toValue = -screenWidth; break;
      case 'all': toValue = -screenWidth * 2; break;
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
      <FriendsHeader activeTab={activeTab} onTabPress={handleTabPress} />

      {activeTab === 'main' ? (
        <ScrollView contentContainerStyle={{alignItems:"center", gap: 10}} overScrollMode="never">
          <RequestsFriends limit={3} scrollable={true} />
          <RecomendFriends limit={2} scrollable={true} />
          <AllFriends limit={2} scrollable={true} />
        </ScrollView>
      ) : (
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <Animated.View style={{
            flexDirection: 'row',
            width: screenWidth * 3,
            transform: [{ translateX }],
          }}>
            <ScrollView style={{ width: screenWidth }} overScrollMode="never">
              <RequestsFriends />
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
}