import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Cross from "../../../shared/ui/icons/cross";
import { Input } from "../../../shared/ui/input";
import { POST } from "../../../shared/api/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../../modules/auth/context/user-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_BASE_URL } from "../../../settings";

interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
}

export default function RegStepTwoModal({ modalVisible, changeVisibility }: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [tokenUser, setTokenUser] = useState<string>("");
  const { register, setShowWelcomeModal, showWelcomeModal, user } = useUserContext();
  const router = useRouter();
  const params = useLocalSearchParams<{
    email: string;
    password: string;
    code: string;
  }>();

  const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("token");
    return token || "";
  };

  useEffect(() => {
    getToken().then(setTokenUser);
  }, []);

  const handleSubmit = async () => {
    if (!name || !surname || !username) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }
    const image = "../../../shared/ui/images/user.png"
    await register(params.email, params.password, params.code, name, surname, username,);
    setShowWelcomeModal(false); 
    router.navigate("/home"); 
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={changeVisibility}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Додай деталі про себе</Text>
          </View>

          <ScrollView style={styles.scrollArea} overScrollMode="never">
            
            <View style={styles.form}>
              <Input
                style={{width: "100%"}}
                label="Ім'я"
                placeholder="Введіть ваше ім'я"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                style={{width: "100%"}}
                label="Прізвище"
                placeholder="Введіть ваше прізвище"
                value={surname}
                onChangeText={setSurname}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                style={{width: "100%"}}
                label="Ім'я користувача"
                placeholder="@"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={{ fontSize: 12 }}>
                Або оберіть:
                <Text style={{ fontSize: 12, color: "green" }}>
                  (Запропоновані варіанти відповідно до Ім’я та Прізвища)
                </Text>
              </Text>
            </View>

            <View style={styles.actions}>
              <View style={styles.iconRow}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitText}>Продовжити</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Стили залишаються без змін
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#070A1C",
  },
  form: {
    gap: 5,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textArea: {
    width: 343,
    minHeight: 100,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CDCED2",
    borderRadius: 10,
    fontSize: 16,
  },
  actions: {
    gap: 16,
    marginTop: 16,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#543C52",
    padding: 12,
    borderRadius: 1234,
    gap: 8,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollArea: {
    flexGrow: 0,
  },
});