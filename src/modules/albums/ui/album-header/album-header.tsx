// import {
//     TouchableOpacity,
//     View,
//     Text,
//     Animated,
//     Dimensions,
//     StyleSheet,
//     FlatList,
// } from "react-native";
// import { useRef, useState, useEffect } from "react";
// import { useAlbums } from "../../hooks/useAlbums";
// import { Settings } from "../../../settings";
// import { My } from "../my/my";
// import { Album } from "../album/album";
// import { NoAlbums } from "../no-albums/no-albums";
// import { useUserContext } from "../../../auth/context/user-context";
// import { IAlbum } from "../../types/albums.types";

// const screenWidth = Dimensions.get("window").width;

// export function AlbumHeader() {
//     const [activeTab, setActiveTab] = useState("personal");
//     const translateX = useRef(new Animated.Value(0)).current;
//     const { user } = useUserContext();
//     const { albums } = useAlbums();
//     const [userAlbums, setUserAlbums] = useState<IAlbum[]>([]);

//     useEffect(() => {
//         translateX.setValue(0);
//     }, []);

//     useEffect(() => {
//         if (!user) return;
//         const myAlbums = albums.filter((album) => album.author_id === user.id);
//         setUserAlbums(myAlbums);
//     }, [albums, user]);
//     // console.log(userAlbums)
//     const handleTabPress = (tab: string) => {
//         const toValue = tab === "personal" ? 0 : -screenWidth;
//         Animated.timing(translateX, {
//             toValue,
//             duration: 300,
//             useNativeDriver: true,
//         }).start();
//         setActiveTab(tab);
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <View style={styles.tabContainer}>
//                 <TouchableOpacity
//                     style={styles.tabItem}
//                     onPress={() => handleTabPress("personal")}
//                 >
//                     <Text
//                         style={[
//                             styles.tabText,
//                             activeTab === "personal" && styles.tabTextActive,
//                         ]}
//                     >
//                         Особиста інформація
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.tabItem}
//                     onPress={() => handleTabPress("albums")}
//                 >
//                     <Text
//                         style={[
//                             styles.tabText,
//                             activeTab === "albums" && styles.tabTextActive,
//                         ]}
//                     >
//                         Альбоми
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={{ flex: 1, width: screenWidth * 2, flexDirection: "row" }}>
//                 <Animated.View
//                     style={{
//                         flexDirection: "row",
//                         width: screenWidth * 2,
//                         transform: [{ translateX }],
//                     }}
//                 >
//                     <View style={{ width: screenWidth, flex: 1, backgroundColor: "#E9E5EE" }}>
//                         <Settings />
//                     </View>
                    
//                     <FlatList
//                         style={{ width: screenWidth, flex: 1, backgroundColor: "#E9E5EE" }}
//                         contentContainerStyle={{ gap: 8, paddingBottom: 60 }}
//                         data={userAlbums.slice(1)}
//                         keyExtractor={(item) => `${item.id}`}
//                         ListHeaderComponent={() => (
//                             <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 16, backgroundColor: "#E9E5EE" }}>
//                                 <My albums={albums} />
//                             </View>
//                         )}
//                         renderItem={({ item }) => (
//                             <Album
//                                 id={item.id}
//                                 name={item.name}
//                                 topic={item.topic}
//                                 created_at={item.created_at}
//                                 author_id={item.author_id}
//                                 images={item.images}
//                             />
//                         )}
//                         ListEmptyComponent={
//                             <View>
//                                 <NoAlbums />
//                             </View>
//                         }
//                     />
//                 </Animated.View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     tabContainer: {
//         paddingLeft: 32,
//         height: 56,
//         flexDirection: "row",
//         justifyContent: "center",
//         width: "100%",
//         alignContent: "center",
//         backgroundColor: "#E9E5EE",
//     },
//     tabItem: {
//         flex: 1,
//         alignItems: "center",
//         paddingVertical: 16,
//     },
//     tabText: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#81818D",
//     },
//     tabTextActive: {
//         color: "#070A1C",
//         fontWeight: "700",
//         borderBottomWidth: 2,
//         borderBottomColor: "#070A1C",
//         paddingBottom: 4,
//     },
// });

// import { TouchableOpacity, View, Text, Animated, Dimensions, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
// import { useRef, useState, useEffect, useMemo } from "react";
// import { useAlbums } from "../../hooks/useAlbums";
// import { Settings } from "../../../settings";
// import { My } from "../my/my";
// import { Album } from "../album/album";
// import { NoAlbums } from "../no-albums/no-albums";
// import { useUserContext } from "../../../auth/context/user-context";
// import { IAlbum } from "../../types/albums.types";

// const screenWidth = Dimensions.get("window").width;

// export function AlbumHeader() {
//   const [activeTab, setActiveTab] = useState("personal");
//   const translateX = useRef(new Animated.Value(0)).current;
//   const { user } = useUserContext();
//   const { albums, refetch, setAlbums} = useAlbums();
//   const [userAlbums, setUserAlbums] = useState<IAlbum[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [error, setError] = useState<boolean>(false)

//   const filteredAlbums = useMemo(() => {
//     if (!user) return [];
//     return albums.filter((album) => album.author_id.toString() === user.id.toString());
//   }, [albums, user]);

//   useEffect(() => {
//     setUserAlbums(filteredAlbums);
//   }, [filteredAlbums]);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const res = await refetch()
//   //     } catch (error: any) {
//   //       console.error("error retfching data")
//   //     } finally {
//   //       setTimeout(await refetch(), 10000)
  
//   //     }
//   //   }
//   //     fetchData()
//   // }, [])

//   useEffect(() => {
//     translateX.setValue(0);
//   }, []);

//   const handleTabPress = (tab: string) => {
//     const toValue = tab === "personal" ? 0 : -screenWidth;
//     Animated.timing(translateX, {
//       toValue,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//     setActiveTab(tab);
//   };

//   useEffect(() => {
//     const loadAlbums = async () => {
//       setIsLoading(true);
//       try {
//         const data = await refetch();
//         setAlbums(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadAlbums();
//   }, []);

//   const handleAlbumCreated = (newAlbum: any) => {
//     setAlbums([...albums, newAlbum]); 
//   };
//   // console.log("АЛЬБОМЫ",albums)

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.tabContainer}>
//         <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("personal")}>
//           <Text style={[styles.tabText, activeTab === "personal" && styles.tabTextActive]}>
//             Особиста інформація
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("albums")}>
//           <Text style={[styles.tabText, activeTab === "albums" && styles.tabTextActive]}>
//             Альбоми
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ flex: 1, width: screenWidth * 2, flexDirection: "row" }}>
//         <Animated.View
//           style={{
//             flexDirection: "row",
//             width: screenWidth * 2,
//             transform: [{ translateX }],
//           }}
//         >
//           <View style={{ width: screenWidth, flex: 1, backgroundColor: "#E9E5EE" }}>
//             <Settings />
//           </View>

//           {isLoading ? (
//             <ActivityIndicator size="large" color="#070A1C" style={{ flex: 1, width: screenWidth }} />
//           ) : error ? (
//             <View style={{ flex: 1, width: screenWidth, justifyContent: "center", alignItems: "center" }}>
//               <Text style={{ color: "#070A1C" }}>Помилка: {error}</Text>
//             </View>
//           ) : (
//             <FlatList
//               style={{ width: screenWidth, flex: 1, backgroundColor: "#E9E5EE" }}
//               contentContainerStyle={{ gap: 8, paddingBottom: 60 }}
//               data={userAlbums.slice(1)}
//               keyExtractor={(item) => `${item.id}`}
//               ListHeaderComponent={() => (
//                 <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 16, backgroundColor: "#E9E5EE" }}>
//                   <My albums={albums} />
//                 </View>
//               )}
//               renderItem={({ item }) => (
//                 <Album
//                   id={item.id}
//                   name={item.name}
//                   topic={item.topic}
//                   created_at={item.created_at}
//                   author_id={item.author_id}
//                   images={item.images}
//                 />
//               )}
//               ListEmptyComponent={<View><NoAlbums /></View>}
//             />
//           )}
//         </Animated.View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabContainer: {
//     paddingLeft: 32,
//     height: 56,
//     flexDirection: "row",
//     justifyContent: "center",
//     width: "100%",
//     alignContent: "center",
//     backgroundColor: "#E9E5EE",
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 16,
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#81818D",
//   },
//   tabTextActive: {
//     color: "#070A1C",
//     fontWeight: "700",
//     borderBottomWidth: 2,
//     borderBottomColor: "#070A1C",
//     paddingBottom: 4,
//   },
// });

import {
  TouchableOpacity,
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRef, useState, useEffect, useMemo } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { Settings } from "../../../settings";
import { My } from "../my/my";
import { Album } from "../album/album";
import { NoAlbums } from "../no-albums/no-albums";
import { useUserContext } from "../../../auth/context/user-context";
import { IAlbum } from "../../types/albums.types";


const screenWidth = Dimensions.get("window").width;

export function AlbumHeader() {
  const [activeTab, setActiveTab] = useState("personal");
  const translateX = useRef(new Animated.Value(0)).current;
  const { user } = useUserContext();
  const { albums, isLoading, error, setAlbums } = useAlbums();
  const [modalVisible, setModalVisible] = useState(false);

  const filteredAlbums = useMemo(() => {
    if (!user) return [];
    return albums.filter((album) => album.author_id.toString() === user.id.toString());
  }, [albums, user]);

  useEffect(() => {
    translateX.setValue(0);
  }, []);

  const handleTabPress = (tab: string) => {
    const toValue = tab === "personal" ? 0 : -screenWidth;
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setActiveTab(tab);
  };

  const handleAlbumCreated = (newAlbum: IAlbum) => {
    setAlbums([...albums, newAlbum]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("personal")}>
          <Text style={[styles.tabText, activeTab === "personal" && styles.tabTextActive]}>
            Особиста інформація
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress("albums")}>
          <Text style={[styles.tabText, activeTab === "albums" && styles.tabTextActive]}>
            Альбоми
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, width: screenWidth * 2, flexDirection: "row" }}>
        <Animated.View
          style={{
            flexDirection: "row",
            width: screenWidth * 2,
            transform: [{ translateX }],
          }}
        >
          <View style={{ width: screenWidth, flex: 1, backgroundColor: "#E9E5EE" }}>
            <Settings />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#070A1C" style={{ flex: 1, width: screenWidth }} />
          ) : error ? (
            <View style={{ flex: 1, width: screenWidth, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#070A1C" }}>Помилка: {error}</Text>
            </View>
          ) : (
            <View style={{ width: screenWidth, flex: 1, backgroundColor: "#E9E5EE" }}>
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ gap: 8, paddingBottom: 60 }}
                data={filteredAlbums.slice(1)}
                keyExtractor={(item) => `${item.id}`}
                ListHeaderComponent={() => (
                  <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 16, backgroundColor: "#E9E5EE" }}>
                    <My albums={albums} />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.addButtonText}>Додати альбом</Text>
                    </TouchableOpacity>
                  </View>
                )}
                renderItem={({ item }) => (
                  <Album
                    id={item.id}
                    name={item.name}
                    topic={item.topic}
                    created_at={item.created_at}
                    author_id={item.author_id}
                    images={item.images}
                  />
                )}
                ListEmptyComponent={<NoAlbums />}
              />
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    paddingLeft: 32,
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    backgroundColor: "#E9E5EE",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#81818D",
  },
  tabTextActive: {
    color: "#070A1C",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: "#070A1C",
    paddingBottom: 4,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#070A1C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});