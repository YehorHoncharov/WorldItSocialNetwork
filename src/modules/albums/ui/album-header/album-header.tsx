import {
    TouchableOpacity,
    View,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
} from "react-native";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { Settings } from "../../../settings";
import { My } from "../my/my";
import { Album } from "../album/album";
import { NoAlbums } from "../no-albums/no-albums";
import { useUserContext } from "../../../auth/context/user-context";
import { IAlbum } from "../../types/albums.types";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export function AlbumHeader() {
    const [activeTab, setActiveTab] = useState("personal");
    const translateX = useRef(new Animated.Value(0)).current;
    const { user } = useUserContext();
    const { albums, refetch } = useAlbums();
    const [userAlbums, setUserAlbums] = useState<IAlbum[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    const filteredAlbums = useMemo(() => {
        if (!user) return [];
        return albums.filter(
            (album) => album.author_id.toString() === user.id.toString()
        );
    }, [albums, user])

    useEffect(() => {
        setUserAlbums(filteredAlbums);
    }, [filteredAlbums]);


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

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => handleTabPress('personal')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'personal' && styles.tabTextActive,
                        ]}
                    >
                        Особиста інформація
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => handleTabPress('albums')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'albums' && styles.tabTextActive,
                        ]}
                    >
                        Альбоми
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, width: screenWidth * 2, flexDirection: 'row' }}>
                <Animated.View
                    style={{
                        flexDirection: 'row',
                        width: screenWidth * 2,
                        transform: [{ translateX }],
                    }}
                >
                    <View
                        style={{ width: screenWidth, flex: 1, backgroundColor: '#E9E5EE' }}
                    >
                        <Settings />
                    </View>

                    {isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color="#070A1C"
                            style={{ flex: 1, width: screenWidth }}
                        />
                    ) : error ? (
                        <View
                            style={{
                                flex: 1,
                                width: screenWidth,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#070A1C' }}>Помилка: {error}</Text>
                        </View>
                    ) : (
                        <ScrollView
                            style={{
                                width: screenWidth,
                                flex: 1,
                                backgroundColor: '#E9E5EE',
                            }}
                            contentContainerStyle={{ gap: 8, paddingBottom: 60 }}

                        >
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingTop: 16,
                                    backgroundColor: "#E9E5EE",
                                }}
                            >
                                <My albums={albums} />
                            </View>
                            {userAlbums.length > 1 ? (
                                userAlbums.slice(1).map((item) => (
                                    <Album
                                        key={`${item.id}`}
                                        id={item.id}
                                        name={item.name}
                                        topic={item.topic}
                                        created_at={item.created_at}
                                        author_id={item.author_id}
                                        images={item.images}
                                    />
                                ))
                            ) : (
                                <NoAlbums />
                            )}
                        </ScrollView>
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
});
