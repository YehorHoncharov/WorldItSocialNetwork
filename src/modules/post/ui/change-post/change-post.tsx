import React, { useEffect, useState, useMemo } from "react";
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
  MediaTypeOptions,
} from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { useUserContext } from "../../../auth/context/user-context";
import { PUT } from "../../../../shared/api/put";
import Cross from "../../../../shared/ui/icons/cross";
import { Input } from "../../../../shared/ui/input";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import { styles } from "./change-post.styles";

interface PostData {
  id: number;
  name: string;
  theme: string;
  text: string;
  links?: string;
  images?: string[]; // Для відображення у UI
  tags?: string[];
}

interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  postData: PostData;
}

interface TagItem {
  label: string;
  value: string;
}

interface ImageUpdate {
  create?: { url: string; postId: number }[];
  delete?: string[];
}

interface UpdateData {
  name?: string;
  theme?: string;
  text?: string;
  links?: string;
  tags?: string[];
  images?: ImageUpdate;
}

export function ChangePostModal({ 
  modalVisible, 
  changeVisibility,
  postData,
}: Props) {
  const { user } = useUserContext();
  const [name, setName] = useState(postData.name);
  const [theme, setTheme] = useState(postData.theme);
  const [text, setText] = useState(postData.text);
  const [links, setLinks] = useState(postData.links || "");
  const [images, setImages] = useState<string[]>(postData.images || []);
  const [tokenUser, setTokenUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(postData.tags || []);
  const [items, setItems] = useState<TagItem[]>([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Ananas', value: 'ananas' },
  ]);

  // Базовий URL для нормалізації відносних URL-адрес
  const API_BASE_URL = "http://192.168.1.104:3000";

const normalizedImages = useMemo(() => {
  return postData.images?.map(uri => {
    if (!uri) return null;
    if (
      uri.startsWith('http') ||
      uri.startsWith('data:image') ||
      uri.startsWith('file:')
    ) {
      return uri;
    } else {
      return `${API_BASE_URL}/${uri.startsWith('') ? uri.slice(1) + "/" : uri}`;
    }
  }).filter((uri): uri is string => !!uri) || [];
}, [postData.images]);


  // Зберігаємо початкові значення для порівняння змін
  const initialData = useMemo(() => ({
    name: postData.name,
    theme: postData.theme,
    text: postData.text,
    links: postData.links || "",
    images: normalizedImages,
    tags: postData.tags || [],
  }), [postData, normalizedImages]);

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
      setImages(normalizedImages);
      setValue(postData.tags || []);
      console.log("postData.images:", postData.images);
      console.log("normalizedImages:", normalizedImages);
      console.log("images state:", normalizedImages);
    }
  }, [
    modalVisible,
    postData.id,
    postData.name,
    postData.theme,
    postData.text,
    postData.links,
    normalizedImages,
    postData.tags,
  ]);

  const handleSubmit = async () => {
    if (!name || !theme || !text) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }

    if (!user) {
      Alert.alert("Помилка", "Ви не авторизовані для редагування посту");
      return;
    }

    // Валідація URL для links
    if (links && !isValidUrl(links)) {
      Alert.alert("Помилка", "Введіть валідне посилання");
      return;
    }

    const updatedData: UpdateData = {};

    if (name !== initialData.name) updatedData.name = name;
    if (theme !== initialData.theme) updatedData.theme = theme;
    if (text !== initialData.text) updatedData.text = text;
    if (links !== initialData.links) updatedData.links = links || undefined;

    // Завжди включаємо теги
    updatedData.tags = value;

  const imagesForServer = images.map(url =>
    url.startsWith(API_BASE_URL) ? url.replace(API_BASE_URL, '') : url
  );

  updatedData.images = imagesForServer.length > 0
    ? {
        create: imagesForServer.map(url => ({
          url,
          postId: user.id,
        })),
      }
    : undefined;


    // Додаємо видалені зображення, якщо вони є
    const deletedImages = initialData.images.filter(uri => !images.includes(uri));
    if (deletedImages.length > 0) {
      updatedData.images = {
        ...updatedData.images,
        delete: deletedImages,
      };
    }

    // Якщо немає змін (крім tags і images, які завжди включаємо), показуємо повідомлення
    if (Object.keys(updatedData).length === (updatedData.tags ? 1 : 0) && !updatedData.images) {
      Alert.alert("Інформація", "Жодних змін не внесено");
      changeVisibility();
      return;
    }

    setIsLoading(true);
    try {
      await PUT({
        endpoint: `${API_BASE_URL}/posts/${postData.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        token: tokenUser,
        body: updatedData,
      });

      changeVisibility();
      Alert.alert("Успіх", "Публікацію успішно оновлено");
    } catch (err: any) {
      console.error("Помилка при оновленні поста:", err.message);
      Alert.alert("Помилка", err.message || "Не вдалося оновити публікацію");
    } finally {
      setIsLoading(false);
    }
  };

  async function onSearch() {
    const result = await requestMediaLibraryPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert("Помилка", "Потрібен дозвіл для доступу до галереї");
      return;
    }

    const imagesResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 7,
      base64: true,
    });

    if (!imagesResult.canceled && imagesResult.assets) {
      const base64Images = imagesResult.assets
        .filter(asset => asset.base64)
        .map(asset => `data:image/jpeg;base64,${asset.base64}`);
      setImages(prev => [...prev, ...base64Images]);
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const isValidImageUri = (uri: string): boolean => {
    return uri.startsWith('data:image') || uri.startsWith('http') || uri.startsWith('file:');
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
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
              <View style={{ width: 343, zIndex: 1000 }}>
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
              {images.length > 0 ? (
                images.map((uri, idx) => (
                  isValidImageUri(uri) ? (
                    <View key={idx} style={styles.imageContainer}>
                      <Image
                        source={{ uri }}
                        style={styles.imageAdded}
                        resizeMode="cover"
                        onError={() => console.warn(`Failed to load image: ${uri}`)}
                      />
                      <TouchableOpacity 
                        style={styles.removeImageButton} 
                        onPress={() => removeImage(idx)}
                      >
                        <Text style={styles.removeImageText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={idx} style={styles.imageContainer}>
                      <Text style={styles.errorText}>Невалідне зображення</Text>
                    </View>
                  )
                ))
              ) : (
                <Text style={styles.noImagesText}>Немає зображень</Text>
              )}
            </View>

            <View style={styles.actions}>
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={onSearch}>
                  <Image
                    source={require("../../../../shared/ui/images/pictures-modal.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, isLoading && { opacity: 0.6 }]}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  <Text style={styles.submitText}>
                    {isLoading ? "Оновлення..." : "Оновити"}
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