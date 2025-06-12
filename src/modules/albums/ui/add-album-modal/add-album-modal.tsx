import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./add-album-modal.styles";
import { POST } from "../../../../shared/api/post";
import { API_BASE_URL } from "../../../../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../../auth/context/user-context";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  changeVisibility: () => void;
}

interface YearItem {
  label: string;
  value: string;
}

interface ThemeItem {
  label: string;
  value: string;
}

export function AddAlbumModal({ modalVisible, onClose }: Props) {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [year, setYear] = useState("");
  const { user } = useUserContext()
  const [openTheme, setOpenTheme] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [themeItems, setThemeItems] = useState<ThemeItem[]>([
    { label: "Відпочинок", value: "#відпочинок" },
    { label: "Натхнення", value: "#натхнення" },
    { label: "Життя", value: "#життя" },
    { label: "Природа", value: "#природа" },
    { label: "Спокій", value: "#спокій" },
    { label: "Читання", value: "#читання" },
    { label: "Гармонія", value: "#гармонія" },
    { label: "Музика", value: "#музика" },
    { label: "Фільми", value: "#фільми" },
    { label: "Подорожі", value: "#подорожі" },
  ]);
  const [yearItems, setYearItems] = useState<YearItem[]>([
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
  ]);

  const resetForm = () => {
    setName("");
    setTheme("");
    setYear("");
  };

  const handleSubmit = async () => {
    if (!name || !theme || !year) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }

    if (!user) return
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Помилка", "Користувач не авторизований");
        return;
      }

      const response = await POST({
        endpoint: `${API_BASE_URL}/albums/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        token: token,
        body: {
          name,
          theme,
          year,
        },
      });

      if (response.status === "success") {
        Alert.alert("Успіх", "Альбом успішно оновлено!");
        resetForm();
        onClose();
      }
      Alert.alert("Успіх", "Альбом успішно оновлено");
      resetForm();
      onClose();

    } catch (err) {
      console.error(err);
      Alert.alert("Помилка", "Сталася помилка при створенні альбому");
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Створити альбом</Text>
          </View>

          <ScrollView style={styles.scrollArea}>
            <View style={styles.form}>
              <Input
                width={343}
                label="Назва альбому"
                placeholder="назва альбому"
                value={name}
                onChangeText={setName}
              />

              <View style={{ width: "100%", zIndex: 2000, marginTop: 10 }}>
                <DropDownPicker
                  open={openTheme}
                  value={theme}
                  items={themeItems}
                  setOpen={setOpenTheme}
                  setValue={setTheme}
                  setItems={setThemeItems}
                  placeholder="Оберіть тему"
                  searchable={true}
                  searchPlaceholder="Пошук теми..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  addCustomItem={true}
                  maxHeight={200}
                  zIndex={2000}
                  dropDownContainerStyle={{
                    maxHeight: 250,
                    borderColor: "#543C52",
                    zIndex: 2000,
                  }}
                />
              </View>

              <View style={{ width: "100%", zIndex: 1000, marginTop: 10 }}>
                <DropDownPicker
                  open={openYear}
                  value={year}
                  items={yearItems}
                  setOpen={setOpenYear}
                  setValue={setYear}
                  setItems={setYearItems}
                  placeholder="Оберіть рік"
                  searchable={true}
                  searchPlaceholder="Пошук року..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  addCustomItem={true}
                  maxHeight={200}
                  zIndex={1000}
                  dropDownContainerStyle={{
                    maxHeight: 250,
                    borderColor: "#543C52",
                    zIndex: 1000,
                  }}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.submitTextCancel}>Скасувати</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>Зберегти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}