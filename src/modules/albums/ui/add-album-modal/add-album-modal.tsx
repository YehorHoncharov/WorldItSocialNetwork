import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./add-album-modal.styles";

interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  onClose: () => void;
}

interface YearItem {
  label: string;
  value: string;
}

interface ThemeItem {
  label: string;
  value: string;
}

export function AddAlbumModal({ modalVisible, changeVisibility, onClose }: Props) {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [year, setYear] = useState(2025);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [themeItem, setThemeItem] = useState<ThemeItem[]>([
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
  const [yearItem, setYearItem] = useState<YearItem[]>([
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

  const handleSubmit = async () => {
    if (!name || !theme || !year) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }
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

              <View style={{ width: "100%", zIndex: 1000 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={themeItem}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setThemeItem}
                  multiple={true}
                  min={0}
                  max={10}
                  mode="BADGE"
                  badgeDotColors={["#543C52"]}
                  badgeStyle={{
                    backgroundColor: "#E9E5EE",
                    padding: 4,
                    borderRadius: 8,
                    minHeight: 20,
                  }}
                  placeholder="Оберіть або додайте тему"
                  searchable={true}
                  searchPlaceholder="Пошук або створення теми..."
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
                    flex: 1,
                  }}
                  onChangeValue={(newValue) => {}}
                  onChangeSearchText={(text) => {
                    const sanitizedText = text.trim();
                    if (
                      sanitizedText &&
                      !themeItem.some((item) => item.value === sanitizedText) &&
                      sanitizedText.length <= 50
                    ) {
                      setThemeItem((prev) => [
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

              <View style={{ width: "100%", zIndex: 1000 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={yearItem}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setYearItem}
                  multiple={true}
                  min={0}
                  max={10}
                  mode="BADGE"
                  badgeDotColors={["#543C52"]}
                  badgeStyle={{
                    backgroundColor: "#E9E5EE",
                    padding: 4,
                    borderRadius: 8,
                    minHeight: 20,
                  }}
                  placeholder="Оберіть або додайте теги"
                  searchable={true}
                  searchPlaceholder="Пошук або створення тегу..."
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
                    flex: 1,
                  }}
                  onChangeValue={(newValue) => {}}
                  onChangeSearchText={(text) => {
                    const sanitizedText = text.trim();
                    if (
                      sanitizedText &&
                      !yearItem.some((item) => item.value === sanitizedText) &&
                      sanitizedText.length <= 50
                    ) {
                      setYearItem((prev) => [
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
              <Text style={{ fontSize: 12 }}>
                Або оберіть:
                <Text style={{ fontSize: 12, color: "green" }}>
                  (Запропоновані варіанти відповідно до Ім’я та Прізвища)
                </Text>
              </Text>
            </View>

            <View style={styles.actions}>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleSubmit}
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
