import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type FriendsHeaderProps = {
    activeTab: string;
    onTabPress: (tab: string) => void;
};

export function FriendsHeader({ activeTab, onTabPress }: FriendsHeaderProps) {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("main")}>
                <Text
                    style={[styles.tabText, activeTab === "main" && styles.tabTextActive]}
                    numberOfLines={1}
                    ellipsizeMode="clip"
                >
                    Головна
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("requests")}>
                <Text
                    style={[styles.tabText, activeTab === "requests" && styles.tabTextActive]}
                    numberOfLines={1}
                    ellipsizeMode="clip"
                >
                    Запити
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("recommendations")}>
                <Text
                    style={[styles.tabText, activeTab === "recommendations" && styles.tabTextActive]}
                    numberOfLines={1}
                    ellipsizeMode="clip"
                >
                    Рекомендації
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("all")}>
                <Text
                    style={[styles.tabText, activeTab === "all" && styles.tabTextActive]}
                    numberOfLines={1}
                    ellipsizeMode="clip"
                >
                    Всі друзі
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 4,
        paddingVertical: 8,
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#81818D",
        textAlign: "center",
        letterSpacing: -0.2,
    },
    tabTextActive: {
        color: "#070A1C",
        fontWeight: "700",
        borderBottomWidth: 2,
        borderBottomColor: "#543C52",
        paddingBottom: 3,
    },
});