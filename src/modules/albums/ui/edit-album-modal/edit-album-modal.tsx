import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "../../../../shared/ui/input";
import { API_BASE_URL } from "../../../../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./edit-album-modal.style";
import { IAlbum, } from "../../types/albums.types";
import { PUT } from "../../../../shared/api/put";
import { useUserContext } from "../../../auth/context/user-context";

interface Props {
  modalVisible: boolean;
  album_id: number;
  initialData: { name: string; theme: string; year: string };
  changeVisibility: () => void;
  onClose: () => void;
  onUpdate: (updatedAlbum: IAlbum) => void;
}

export function EditAlbumModal({
  modalVisible,
  album_id,
  initialData,
  changeVisibility,
  onClose,
  onUpdate,
}: Props) {
  const [name, setName] = useState(initialData.name);
  const [theme, setTheme] = useState(initialData.theme);
  const [year, setYear] = useState(initialData.year);
  const [openTheme, setOpenTheme] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const { user } = useUserContext()
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

  useEffect(() => {
    setName(initialData.name);
    setTheme(initialData.theme);
    setYear(initialData.year);
  }, [initialData]);

  const resetForm = () => {
    setName(initialData.name);
    setTheme(initialData.theme);
    setYear(initialData.year);
  };

  const handleSubmit = async () => {
    if (!name || !theme || !year) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Помилка", "Користувач не авторизований");
        return;
      }

      const response = await PUT({
        endpoint: `${API_BASE_URL}/albums/${album_id}`,
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

      if (!user) return
      const authorId = user.id

      if (response.status === "success") {
        Alert.alert("Успіх", "Альбом успішно оновлено!");
        onUpdate({ id: album_id, name, created_at, author_id });
        resetForm();
        onClose();
      }
      Alert.alert("Успіх", "Альбом успішно оновлено");
      onUpdate({ id: album_id, name, created_at, author_id });
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert("Помилка", "Сталася помилка при оновленні альбому");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        resetForm();
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Редагувати альбом</Text>
          </View>

          <ScrollView style={styles.scrollArea}>
            <View style={styles.form}>
              <Input
                width={320}
                label="Назва альбому"
                placeholder="назва альбому"
                value={name}
                onChangeText={setName}
              />

              <View style={{ width: "100%", zIndex: 2000, marginTop: 10 }}>
                <DropDownPicker
                  flatListProps={{ nestedScrollEnabled: true }}
                  open={openTheme}
                  value={theme}
                  items={themeItems}
                  setOpen={setOpenTheme}
                  setValue={setTheme}
                  setItems={setThemeItems}
                  placeholder="Оберіть тему"
                  searchable={true}
                  searchPlaceholder="Пошук теми..."
                  listMode="MODAL"
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
                  onChangeSearchText={(text) => {
                    const sanitizedText = text.trim();
                    if (
                      sanitizedText &&
                      !themeItems.some((item) => item.value === sanitizedText) &&
                      sanitizedText.length <= 50
                    ) {
                      setThemeItems((prev) => [
                        ...prev,
                        {
                          label: sanitizedText,
                          value: sanitizedText,
                        },
                      ]);
                    }
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
                  listMode="MODAL"
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
                  onChangeSearchText={(text) => {
                    const sanitizedText = text.trim();
                    if (
                      sanitizedText &&
                      !yearItems.some((item) => item.value === sanitizedText) &&
                      sanitizedText.length <= 50
                    ) {
                      setYearItems((prev) => [
                        ...prev,
                        {
                          label: sanitizedText,
                          value: sanitizedText,
                        },
                      ]);
                    }
                  }}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}
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