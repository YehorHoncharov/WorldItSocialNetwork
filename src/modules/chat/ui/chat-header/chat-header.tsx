import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type ChatHeaderProps = {
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export function ChatHeader({ activeTab, onTabPress }: ChatHeaderProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("contacts")}>
        <Image
          style={[ styles.icon, activeTab === "contacts" && styles.tabContsctsActive ]}>
          source={require("../../../../shared/images/chat-icon.png")}
        </Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("messages")}>
        <Image
            style={[styles.tabText, activeTab === "messages" && styles.tabMessagesActive]}
            source={require("../../../../shared/images/messages.png")}
        >
        </Image>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("chat-group")}>
        <Image
            style={[ styles.icon, activeTab === "chat-group" && styles.tabGroupActive ]}
            source={require("../../../../shared/images/group-chat.png")}
        >
        </Image>
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