import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./conntactWithCheckbox.styles";
import { API_BASE_URL } from "../../../../../settings";
import { IUser } from "../../../../auth/types";
import Checkbox from 'expo-checkbox';


interface Contact {
  userContact: IUser;
  isSelected: boolean;
  onPress?: () => void;
}

export function ContactWithCheckbox({ userContact, isSelected, onPress }: Contact) {
  const [isChecked, setChecked] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: `${API_BASE_URL}/${userContact.avatar?.at(-1)?.image}`
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{userContact.auth_user.first_name || "Anonymous"}</Text>
      {/* <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        /> */}
    </TouchableOpacity>
  );
}