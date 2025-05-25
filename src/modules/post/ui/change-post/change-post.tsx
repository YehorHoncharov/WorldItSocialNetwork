import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../../auth/context/user-context";
import { PUT } from "../../../../shared/api/put";
import Cross from "../../../../shared/ui/icons/cross";
import { Input } from "../../../../shared/ui/input";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import DropDownPicker from "react-native-dropdown-picker";
import { usePosts } from "../../hooks/use-get-post";
import { styles } from "./change-post.styles";
import { IPost, IPostImg } from "../../types/post";

// Типи для компонента
interface TagItem {
  label: string;
  value: string;
}

interface UpdateData {
  name: string;
  theme: string;
  text: string;
  links?: string;
  tags?: string[];
  images?: {
    create?: { url: string }[];
    delete?: { id: number }[];
  };
}

interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  postData: IPost | null;
}

export function ChangePostModal({ modalVisible, changeVisibility, postData }: Props) {
  const { user } = useUserContext();
  const { refetch } = usePosts();
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [text, setText] = useState("");
  const [links, setLinks] = useState("");
  const [images, setImages] = useState<IPostImg[]>([]);
  const [tokenUser, setTokenUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [items, setItems] = useState<TagItem[]>([]);

  const API_BASE_URL = "http://192.168.1.104:3000";

  // Завантаження даних поста при відкритті модального вікна
  useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem("token");
      setTokenUser(token || "");

      console.log("postData:", JSON.stringify(postData, null, 2));

      if (postData) {
        setName(postData.name || "");
        setTheme(postData.theme || "");
        setText(postData.text || "");
        setLinks(postData.links || "");

        // Витягуємо унікальні назви тегів
        const tagsFromPost = Array.from(
          new Set(
            postData.tags
              ?.map((tag) => (tag.tag && tag.tag.name ? tag.tag.name : null))
              .filter((tag): tag is string => tag !== null) || []
          )
        );
        setValue(tagsFromPost);

        // Нормалізуємо зображення
        const loadedImages = postData.images
          ? postData.images.map((img) => {
              const normalizedUrl = img.url.startsWith("http")
                ? img.url
                : `${API_BASE_URL}/${img.url.replace(/^\/+/, "").replace(/\\/g, "/")}`;
              console.log(`Завантажено зображення: ${normalizedUrl}`);
              return { ...img, url: normalizedUrl };
            })
          : [];
        setImages(loadedImages);

        // Формуємо список тегів
        const defaultTags = [
          { label: "Технології", value: "технології" },
          { label: "Подорожі", value: "подорожі" },
          { label: "Їжа", value: "їжа" },
          { label: "Спорт", value: "спорт" },
          { label: "Мистецтво", value: "мистецтво" },
        ];
        const additionalTags = tagsFromPost
          .filter((tag) => !defaultTags.some((defaultTag) => defaultTag.value === tag))
          .map((tag) => ({ label: tag, value: tag }));
        const uniqueTags = Array.from(
          new Set([...defaultTags, ...additionalTags].map((item) => JSON.stringify(item)))
        ).map((item) => JSON.parse(item));
        setItems(uniqueTags);
      }
    };

    if (modalVisible) {
      loadData();
    }
  }, [modalVisible, postData]);

  // Обробка відправки форми
  const handleSubmit = async () => {
    if (!postData || !postData.id) {
      Alert.alert("Помилка", "Дані поста або ID поста відсутні");
      return;
    }
    if (!tokenUser) {
      Alert.alert("Помилка", "Токен авторизації відсутній");
      return;
    }
    if (!name.trim() || !theme.trim() || !text.trim()) {
      Alert.alert("Помилка", "Заповніть усі обов’язкові поля");
      return;
    }
    if (links && !isValidUrl(links)) {
      Alert.alert("Помилка", "Введіть коректне посилання");
      return;
    }
    if (value.length > 5) {
      Alert.alert("Помилка", "Максимум 5 тегів");
      return;
    }

    const updatedData: UpdateData = {
      name: name.trim(),
      theme: theme.trim(),
      text: text.trim(),
      ...(links ? { links: links.trim() } : {}),
      tags: value.filter((tag) => typeof tag === "string" && tag.trim() !== ""),
    };

    console.log("Теги для відправки:", value);
    console.log("Зображення для відправки:", images.map((img) => img.url));

    // Формуємо списки зображень для створення та видалення
    const existingImages = postData.images || [];
    const persistedImages = images.filter((img) =>
      existingImages.some((pi) => pi.id === img.id && pi.url === img.url)
    );
    const newImages = images
      .filter((img) => img.url.startsWith("data:image"))
      .map((img) => {
        if (!img.url.match(/^data:image\/(\w+);base64,.+$/)) {
          console.warn("Некоректний формат зображення:", img.url);
          return null;
        }
        return { url: img.url };
      })
      .filter((img): img is { url: string } => img !== null);

    const deletedImages = existingImages
      .filter((pi) => !persistedImages.some((img) => img.id === pi.id))
      .map((pi) => ({ id: pi.id as number }))
      .filter((img) => typeof img.id === "number");

    if (newImages.length > 0 || deletedImages.length > 0) {
      updatedData.images = {
        ...(newImages.length > 0 ? { create: newImages } : {}),
        ...(deletedImages.length > 0 ? { delete: deletedImages } : {}),
      };
    }

    console.log("Дані для відправки:", JSON.stringify(updatedData, null, 2));

    setIsLoading(true);
    try {
      const response = await PUT<IPost>({
        endpoint: `${API_BASE_URL}/posts/${postData.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: updatedData,
      });

      console.log("Відповідь сервера:", JSON.stringify(response, null, 2));

      if (response.status === "success") {
        console.log("Пост успішно оновлено:", JSON.stringify(response.data, null, 2));
        Alert.alert("Успіх", "Пост успішно оновлено");
        await refetch();
        changeVisibility();
      } else {
        console.error("Помилка від сервера:", response.message, "Код:", response.code);
        Alert.alert("Помилка", response.message || "Не вдалося оновити пост");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Невідома помилка";
      console.error("Помилка при відправленні запиту:", message);
      Alert.alert("Помилка", `Не вдалося оновити пост: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Додавання зображень
  const onSearch = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Дозвіл не надано", "Для додавання зображень необхідно надати доступ до галереї");
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets
        .filter((asset) => asset.base64)
        .map((asset, index) => {
          const maxSizeInBytes = 5 * 1024 * 1024; // 5 МБ
          const base64Data = Buffer.from(asset.base64!, "base64");
          if (base64Data.length > maxSizeInBytes) {
            Alert.alert("Помилка", `Зображення ${index + 1} занадто велике (макс. 5 МБ)`);
            return null;
          }
          return {
            id: `temp-${Date.now()}-${index}`,
            url: `data:image/jpeg;base64,${asset.base64}`,
            userPostId: postData?.id || 0,
          };
        })
        .filter((img): img is { id: string; url: string; userPostId: number } => img !== null);

      if (images.length + newImages.length > 10) {
        Alert.alert("Увага", "Максимальна кількість зображень - 10");
        return;
      }

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Видалення зображення
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Валідація URL
  const isValidUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return urlPattern.test(url);
  };

  // Рендеринг зображень
  const renderImages = () => {
    if (images.length === 0) {
      return <Text style={styles.noImagesText}>Додайте зображення</Text>;
    }

    return (
      <View style={styles.imageGrid}>
        {images.map((img, idx) => (
          <View key={`image-${img.id}-${idx}`} style={styles.imageContainer}>
            <Image
              source={{ uri: img.url }}
              style={styles.imageAdded}
              resizeMode="cover"
              onError={(e) => {
                console.error(`Помилка завантаження зображення: ${img.url}`, e.nativeEvent.error);
                Alert.alert("Помилка", `Не вдалося завантажити зображення: ${img.url}`);
              }}
              onLoad={() => console.log(`Зображення завантажено: ${img.url}`)}
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
    );
  };

  if (!postData) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={changeVisibility}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Редагувати публікацію</Text>
            <Pressable onPress={changeVisibility}>
              <Cross style={{ width: 15, height: 15 }} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ gap: 15 }}>
              <Input
                width={343}
                label="Назва*"
                placeholder="Введіть назву публікації"
                value={name}
                onChangeText={setName}
                maxLength={100}
              />

              <Input
                width={343}
                label="Тема*"
                placeholder="Введіть тему публікації"
                value={theme}
                onChangeText={setTheme}
                maxLength={60}
              />

              <TextInput
                style={{
                  minHeight: 120,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: "#f9f9f9",
                }}
                placeholder="Опис публікації*"
                value={text}
                onChangeText={setText}
                multiline
                textAlignVertical="top"
                maxLength={2000}
              />

              <Input
                width={343}
                label="Посилання"
                placeholder="https://example.com"
                value={links}
                onChangeText={setLinks}
                keyboardType="url"
              />

              <View style={{ width: 343, zIndex: 1000, marginTop: 10 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={(callback) => {
                    const newValue = typeof callback === "function" ? callback(value) : callback;
                    const uniqueValues = Array.from(new Set(newValue))
                      .map(String)
                      .filter((tag) => tag.trim() !== "");
                    if (uniqueValues.length > 5) {
                      Alert.alert("Помилка", "Максимум 5 тегів");
                      return;
                    }
                    console.log("Оновлені теги:", uniqueValues);
                    setValue(uniqueValues);
                  }}
                  setItems={setItems}
                  multiple={true}
                  min={0}
                  max={5}
                  mode="BADGE"
                  badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926"]}
                  placeholder="Оберіть або додайте теги"
                  searchable={true}
                  searchPlaceholder="Пошук або створення тегу..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  addCustomItem={true}
                  onChangeSearchText={(text) => {
                    if (text && !items.some((item) => item.value === text)) {
                      setItems((prev) => [
                        ...prev,
                        { label: text, value: text },
                      ]);
                    }
                  }}
                />
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 5 }}>
                {value.map((tag, index) => (
                  <View
                    key={`${tag}-${index}`}
                    style={{
                      backgroundColor: "#e0f2fe",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={{ color: "#0369a1", fontSize: 14 }}>{tag}</Text>
                    <TouchableOpacity
                      onPress={() => setValue((prev) => prev.filter((_, i) => i !== index))}
                    >
                      <Text style={{ color: "#0369a1", fontSize: 14 }}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginTop: 20,
                marginBottom: 10,
                color: "#333",
              }}
            >
              Зображення ({images.length}/10)
            </Text>
            {renderImages()}

            <View style={{ marginTop: 20, gap: 15 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#ddd",
                }}
                onPress={onSearch}
              >
                <Text style={{ color: "#333", fontWeight: "500" }}>+ Додати зображення</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    backgroundColor: "#3b82f6",
                    padding: 15,
                    borderRadius: 8,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  },
                  isLoading && { opacity: 0.7 },
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                      Оновити публікацію
                    </Text>
                    <SendArrow style={{ width: 20, height: 20 }} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}