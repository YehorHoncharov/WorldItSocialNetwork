// import { TouchableOpacity, View, Text, Animated, Dimensions, StyleSheet } from "react-native";
// import { useRef, useState, useEffect } from "react";
// import { RequestsFriends } from "../requests/requests";
// import { RecomendFriends } from "../recomend/recomend";
// import { AllFriends } from "../all/all";

// const screenWidth = Dimensions.get("window").width;

// export function FriendsHeader() {
//     const [activeTab, setActiveTab] = useState('main');
//     const translateX = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         translateX.setValue(0);
//     }, []);

//     const handleTabPress = (tab: string) => {
//         let toValue = 0;
//         switch(tab) {
//             case 'main': toValue = 0; break;
//             case 'requests': toValue = -screenWidth; break;
//             case 'recommendations': toValue = -screenWidth * 2; break;
//             case 'all': toValue = -screenWidth * 3; break;
//         }
        
//         Animated.timing(translateX, {
//             toValue,
//             duration: 300,
//             useNativeDriver: true,
//         }).start();
        
//         setActiveTab(tab);
//     };

//     function renderContent(){
//         switch(activeTab) {
//             case 'main': return 1;
//             case 'requests': return <RequestsFriends/>;
//             case 'recommendations': return <RecomendFriends/>;
//             case 'all': return <AllFriends/>;
//             default: return 1;
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {/* Хедер с табами */}
//             <View style={[styles.tabContainer, { paddingHorizontal: 0 }]}>
//                 <TouchableOpacity 
//                     style={styles.tabItem}
//                     onPress={() => handleTabPress('main')}
//                 >
//                     <Text style={[
//                         styles.tabText,
//                         activeTab === 'main' && styles.tabTextActive
//                     ]}>
//                         Головна
//                     </Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity 
//                     style={styles.tabItem}
//                     onPress={() => handleTabPress('requests')}
//                 >
//                     <Text style={[
//                         styles.tabText,
//                         activeTab === 'requests' && styles.tabTextActive
//                     ]}>
//                         Запити
//                     </Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity 
//                     style={styles.tabItem}
//                     onPress={() => handleTabPress('recommendations')}
//                 >
//                     <Text style={[
//                         styles.tabText,
//                         activeTab === 'recommendations' && styles.tabTextActive
//                     ]}>
//                         Рекомендації
//                     </Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity 
//                     style={styles.tabItem}
//                     onPress={() => handleTabPress('all')}
//                 >
//                     <Text style={[
//                         styles.tabText,
//                         activeTab === 'all' && styles.tabTextActive
//                     ]}>
//                         Всі друзі
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Контейнер для контента */}
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text style={{ fontSize: 100, fontWeight: 'bold' }}>
//                     {renderContent()}
//                 </Text>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     tabContainer: {
//         padding: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
//     tabItem: {
//         flex: 1,
//         alignItems: 'center',
//         paddingVertical: 16,
//     },
//     tabText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: '#81818D',
//     },
//     tabTextActive: {
//         color: '#070A1C',
//         fontWeight: '700',
//         borderBottomWidth: 2,
//         borderBottomColor: '#070A1C',
//         paddingBottom: 4,
//     },
// });


import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type FriendsHeaderProps = {
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export function FriendsHeader(props: FriendsHeaderProps) {
    const { activeTab, onTabPress } = props
  return (
    <View style={[styles.tabContainer, { paddingHorizontal: 0 }]}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('main')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'main' && styles.tabTextActive
        ]}>
          Головна
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('requests')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'requests' && styles.tabTextActive
        ]}>
          Запити
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('recommendations')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'recommendations' && styles.tabTextActive
        ]}>
          Рекомендації
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('all')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'all' && styles.tabTextActive
        ]}>
          Всі друзі
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#81818D',
  },
  tabTextActive: {
    color: '#070A1C',
    fontWeight: '700',
    borderBottomWidth: 2,
    borderBottomColor: '#070A1C',
    paddingBottom: 4,
  },
});