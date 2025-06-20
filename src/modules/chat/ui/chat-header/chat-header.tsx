import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

type ChatHeaderProps = {
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export function ChatHeader({ activeTab, onTabPress }: ChatHeaderProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("contacts")}>
        <Image
          // style={[ styles.icon, activeTab === "contacts" && styles.tabContsctsActive ]}
          style={[ styles.iconContact, activeTab === "contacts" && styles.iconContact ]}
          source={require("../../../../shared/ui/images/contacts1.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("messages")}>
        <Image
            // style={[styles.tabText, activeTab === "messages" && styles.tabMessagesActive]}
            style={[ styles.iconMessages, activeTab === "messages" && styles.iconMessages]}
            source={require("../../../../shared/ui/images/messages (2).png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("chat-group")}>
        <Image
            // style={[ styles.icon, activeTab === "chat-group" && styles.tabGroupActive ]}
            style={[ styles.iconChatGroup, activeTab === "chat-group" && styles.iconChatGroup ]}
            source={require("../../../../shared/ui/images/groupChats.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  iconContact: {
    height: 52,
    width: 74
  },
  iconMessages: {
    height: 54,
    width: 104
  },
  iconChatGroup: {
    height: 54,
    width: 96
  }
});