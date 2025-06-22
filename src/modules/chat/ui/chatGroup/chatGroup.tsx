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
import BackArrowIcon from "../../../../shared/ui/icons/arrowBack";
import { styles } from "./chatGroup.styles";
import Dots from "../../../../shared/ui/icons/dots";
import CheckMarkIcon from "../../../../shared/ui/icons/checkMark";

export function ChatGroup() {
  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity>
          <BackArrowIcon style={{ width: 10, height: 15 }} />
        </TouchableOpacity>
        <Image
          source={require("../../../../shared/ui/images/groupAvatar.png")}
          style={styles.avatar}
        />
        <View style={{}}>
          <Text style={styles.chatName}>New Group</Text>
          <Text style={styles.chatInfo}>3 учасники, 1 в сети</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Dots style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>

      {/* Chat Date */}
      <Text style={styles.chatDate}>25 травня 2025</Text>

      {/* Messages */}
      <View style={styles.messages}>
        <View style={[styles.message, { justifyContent: "flex-end" }]}>
          <View style={styles.messageBubbleMy}>
            <Text style={styles.messageText}>Привіт!</Text>
            <Text style={styles.messageTime}>10:01 <CheckMarkIcon style={{ width: 10, height: 9 }} /></Text>
          </View>
        </View>
        <View style={styles.message}>
          <Image source={require('../../../../shared/ui/images/avatar.png')} style={{ width: 50, height: 50 }} />
          <View style={styles.messageBubble}>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.messageSender}>Wade Warren</Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Text style={styles.messageText}>Привіт! Як справи?</Text>
                <Text style={styles.messageTime}>10:30 <CheckMarkIcon style={{ width: 10, height: 9 }} /></Text>
              </View>
            </View>

          </View>
        </View>
        <View style={styles.message}>
          <Image source={require('../../../../shared/ui/images/avatar.png')} style={{ width: 50, height: 50 }} />
          <View style={styles.messageBubble}>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text style={styles.messageSender}>Cameron Williamson</Text>
              <View style={{ flexDirection: "row", gap: 30 }}>
                <Text style={styles.messageText}>Чудово!</Text>
                <Text style={styles.messageTime}>10:30 <CheckMarkIcon style={{ width: 10, height: 9 }} /></Text>
              </View>
            </View>

          </View>
        </View>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Повідомлення" />
        <TouchableOpacity style={styles.attachBtn}>
          <Image
            source={require("../../../../shared/ui/images/pictures-modal.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn}>
          <SendArrow style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
