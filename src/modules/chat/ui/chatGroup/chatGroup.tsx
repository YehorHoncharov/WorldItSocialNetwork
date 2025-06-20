import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SendArrow from "../../../../shared/ui/icons/send-arrow";

export function ChatGroup() {
  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>New Group</Text>
        <Text style={styles.chatInfo}>3 учасники, 1 в сети</Text>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Date */}
      <Text style={styles.chatDate}>25 травня 2025</Text>

      {/* Messages */}
      <View style={styles.messages}>
        <View style={styles.message}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageSender}>Wade Warren</Text>
            <Text style={styles.messageText}>Привіт!</Text>
          </View>
          <Text style={styles.messageTime}>10:01</Text>
        </View>
        <View style={styles.message}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageSender}>Wade Warren</Text>
            <Text style={styles.messageText}>Привіт! Як справи?</Text>
          </View>
          <Text style={styles.messageTime}>10:30</Text>
        </View>
        <View style={styles.message}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageSender}>Cameron Williamson</Text>
            <Text style={styles.messageText}>Чудово!</Text>
          </View>
          <Text style={styles.messageTime}>10:30</Text>
        </View>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Повідомлення" />
        <TouchableOpacity style={styles.attachBtn}>
          <Image
            source={require("../../../../shared/ui/images/pictures-modal.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn}>
          <SendArrow style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatName: { fontSize: 18, fontWeight: "bold" },
  chatInfo: { fontSize: 14, color: "#666" },
  menuBtn: { padding: 5 },
  menuText: { fontSize: 20 },
  chatDate: { color: "#666", textAlign: "center", marginVertical: 10 },
  messages: { flex: 1, paddingHorizontal: 10 },
  message: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  messageBubble: {
    backgroundColor: "#e9ecef",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  messageSender: { fontWeight: "bold", fontSize: 14 },
  messageText: { fontSize: 16 },
  messageTime: { marginLeft: "auto", color: "#666", fontSize: 12 },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
  },
  attachBtn: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtn: {
    padding: 10,
    backgroundColor: "#543C52",
    borderRadius: 123456,
    alignItems: "center",
    justifyContent: "center",
  },
  attachText: { fontSize: 20 },
  sendText: { fontSize: 20 },
});
