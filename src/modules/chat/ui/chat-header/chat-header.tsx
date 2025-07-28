import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import PeopleIcon from "../../../../shared/ui/icons/people";
import React from "react";
import { ChatsIcon } from "../../../../shared/ui/icons/chats";
import { ChatGroupIcon } from "../../../../shared/ui/icons/groupChats";


type ChatHeaderProps = {
    activeTab: string;
    onTabPress: (tab: string) => void;
};

export function ChatHeader({ activeTab, onTabPress }: ChatHeaderProps) {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("contacts")}>
                <PeopleIcon style={{ borderColor: '#81818D', width: 20, height: 20 }} />
                <Text style={[styles.tabText, activeTab === "contacts" && styles.tabTextActive]}>Контакти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("messages")}>
                <ChatsIcon style={{ width: 20, height: 20 }} />
                <Text style={[styles.tabText, activeTab === "messages" && styles.tabTextActive]}>Повідомлення</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("chat-group")}>
                <ChatGroupIcon style={{ width: 20, height: 20 }} />
                <Text style={[styles.tabText, activeTab === "chat-group" && styles.tabTextActive]}>Групові чати</Text>
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