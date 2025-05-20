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
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DropDownPicker from "react-native-dropdown-picker";
import { useUserContext } from "../../../auth/context/user-context";
import { PUT } from "../../../../shared/api/put";
import Cross from "../../../../shared/ui/icons/cross";
import { Input } from "../../../../shared/ui/input";
import SendArrow from "../../../../shared/ui/icons/send-arrow";

interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  postData: {
    id: number;
    name: string;
    theme: string;
    text: string;
    links?: string;
    images?: string[];
    tags?: string[];
  };

}

interface TagItem {
  label: string;
  value: string;
}

export function ChangePostModal({ 
  modalVisible, 
  changeVisibility,
  postData,

}: Props) {
  const [name, setName] = useState(postData.name);
  const [theme, setTheme] = useState(postData.theme);
  const [text, setText] = useState(postData.text);
  const [links, setLinks] = useState(postData.links || "");
  const [images, setImages] = useState<string[]>(postData.images || []);
  const [tokenUser, setTokenUser] = useState<string>("");
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(postData.tags || []);
  const [items, setItems] = useState<TagItem[]>([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Ananas', value: 'ananas'},
  ]);

  const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("token");
    return token || "";
  };

  useEffect(() => {
    getToken().then(setTokenUser);
    if (modalVisible) {
      setName(postData.name);
      setTheme(postData.theme);
      setText(postData.text);
      setLinks(postData.links || "");
      setImages(postData.images || []);
      setValue(postData.tags || []);
    }
  }, [modalVisible, postData]);

  const handleSubmit = async () => {
    if (!name || !theme || !text) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }

    if (!user) {
      Alert.alert("Упс... схоже ви не авторизовані 😞, тому не можете редагувати пост");
      return;
    }

    try {
      const formattedImages = images.length > 0 
        ? { 
            create: images.map(url => ({ 
              url,
              postId: postData.id 
            })) 
          } 
        : undefined;

      await PUT({
        endpoint: `http://192.168.1.104:3000/posts/update/${postData.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        token: tokenUser,
        body: {
          name,
          theme,
          text,
          links: links || undefined,
          images: formattedImages,
          tags: value,
        },
      });

      changeVisibility();
      Alert.alert("Успіх", "Публікацію успішно оновлено");
    } catch (err) {
      console.error("Помилка при оновленні поста:", err);
      Alert.alert("Помилка", "Не вдалося оновити публікацію");
    }
  };

  async function onSearch() {
    const result = await requestMediaLibraryPermissionsAsync();
    if (result.status === "granted") {
      const imagesResult = await launchImageLibraryAsync({
        mediaTypes: "images",
        allowsMultipleSelection: true,
        selectionLimit: 7,
        base64: true,
      });

      if (imagesResult.assets) {
        const base64Images = imagesResult.assets.map(
          (asset) => `data:image/jpeg;base64,${asset.base64}`
        );
        setImages((prev) => [...prev, ...base64Images]);
      }
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
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
            <Text style={styles.modalTitle}>
              Редагування публікації
            </Text>
            <Pressable onPress={changeVisibility}>
              <Cross style={{ width: 15, height: 15 }} />
            </Pressable>
          </View>

          <ScrollView style={styles.scrollArea}>
            <View style={styles.form}>
              <Input
                width={343}
                label="Назва публікації"
                placeholder="Напишіть назву публікації"
                value={name}
                onChangeText={setName}
              />
              <Input
                width={343}
                label="Тема публікації"
                placeholder="Напишіть тему публікації"
                value={theme}
                onChangeText={setTheme}
              />
              <View>
                <TextInput
                  style={styles.textArea}
                  placeholder="Введіть опис публікації"
                  value={text}
                  onChangeText={setText}
                  multiline
                  maxLength={150}
                  textAlignVertical="top"
                  autoCapitalize="sentences"
                />
              </View>
              <Input
                width={343}
                label="Посилання"
                placeholder="Ваше посилання..."
                value={links}
                onChangeText={setLinks}
              />
              <View style={{ width: 343 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  multiple={true}
                  min={0}
                  max={5}
                  listMode="SCROLLVIEW"
                  dropDownDirection="TOP"
                  autoScroll={true}
                  placeholder="Оберіть тег"
                  translation={{
                    SELECTED_ITEMS_COUNT_TEXT: {
                      1: "Обрано 1 елемент",
                      n: "Обрано {count} елементів",
                    },
                  }}
                />
              </View>
              <View style={styles.selectedTagsContainer}>
                {value.map((tag) => {
                  const label = items.find((item) => item.value === tag)?.label || tag;
                  return (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.imageGrid}>
              {images.map((uri, idx) => (
                <View key={idx} style={styles.imageContainer}>
                  <Image
                    source={{ uri }}
                    style={styles.imageAdded}
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    style={styles.removeImageButton} 
                    onPress={() => removeImage(idx)}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.actions}>
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={onSearch}>
                  <Image
                    source={require("../../../../shared/ui/images/bitch.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>
                    Оновити
                  </Text>
                  <SendArrow
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

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
  icon: {
    width: 40,
    height: 40,
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
  imageGrid: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: 'relative',
  },
  imageAdded: {
    width: 343,
    height: 225,
    borderRadius: 16,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },
  tag: {
    backgroundColor: "#EEE",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: "#333",
    fontSize: 14,
  },
});