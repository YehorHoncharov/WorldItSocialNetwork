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
import { Props, TagItem, UpdateData } from "./types";
import { styles } from "./change-post.styles";
import { IPost, IPostImg } from "../../types/post";
import DropDownPicker from "react-native-dropdown-picker";

export function ChangePostModal({
  modalVisible,
  changeVisibility,
  postData,
}: Props) {
  const { user } = useUserContext();
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

        // Витягуємо назви тегів і видаляємо дублікати
        const tagsFromPost = Array.from(
          new Set(
            postData.tags
              ?.map((tag) => (tag.tag && tag.tag.name ? tag.tag.name : null))
              .filter((tag): tag is string => tag !== null) || []
          )
        );

        setValue(tagsFromPost);

        const loadedImages = postData.images
          ? postData.images.map((img) => ({
              ...img,
              url: img.url.startsWith("http") ? img.url : `${API_BASE_URL}/${img.url.replace(/^\/+/, '')}`,
            }))
          : [];
        setImages(loadedImages);

        // Додаємо унікальні теги до списку доступних
        const availableTags = Array.from(
          new Set([
            { label: "Технології", value: "технології" },
            { label: "Подорожі", value: "подорожі" },
            { label: "Їжа", value: "їжа" },
            { label: "Спорт", value: "спорт" },
            { label: "Мистецтво", value: "мистецтво" },
            ...tagsFromPost.map((tag) => ({ label: tag, value: tag })),
          ].map(item => JSON.stringify(item)))
        ).map(item => JSON.parse(item));

        setItems(availableTags);
      }
    };

    if (modalVisible) {
      loadData();
    }
  }, [modalVisible, postData]);

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
      Alert.alert("Помилка", "Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    if (links && !isValidUrl(links)) {
      Alert.alert("Помилка", "Будь ласка, введіть коректне посилання");
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
    console.log("Дані для відправки:", JSON.stringify(updatedData, null, 2));

    const existingImageIds = postData.images
      ? postData.images.map((img) => img.id).filter((id): id is number => typeof id === "number")
      : [];
    const currentImages = images.filter(
      (img) => !img.url.startsWith("data:image") || existingImageIds.includes(img.id as number)
    );

    const newImages = images
      .filter((img) => img.url.startsWith("data:image"))
      .filter(
        (img) =>
          !(postData.images && postData.images.some((pi) => pi.url === img.url))
      )
      .map((img) => {
        if (!img.url.match(/^data:image\/(\w+);base64,.+$/)) {
          console.warn("Некоректний формат зображення:", img.url);
          return null;
        }
        return { url: img.url };
      })
      .filter(Boolean) as { url: string }[];

    const deletedImages = postData.images
      ? postData.images
          .filter(
            (img) =>
              typeof img.id === "number" &&
              !currentImages.some((ci) => ci.id === img.id)
          )
          .map((img) => ({ id: img.id as number }))
      : [];

    if (newImages.length > 0 || deletedImages.length > 0) {
      updatedData.images = {
        ...(newImages.length > 0 ? { create: newImages } : {}),
        ...(deletedImages.length > 0 ? { delete: deletedImages } : {}),
      };
    }

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
        changeVisibility();
      } else {
        console.error("Помилка від сервера:", response.message, "Код:", response.code);
        Alert.alert(
          "Помилка",
          response.message || "Не вдалося оновити пост",
          response.code
            ? [{ text: "OK" }, { text: `Код: ${response.code}`, style: "destructive" }]
            : [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Помилка при відправці запиту:", error);
      Alert.alert("Помилка", "Сталася помилка при оновленні поста");
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Дозвіл не надано",
        "Для додавання зображень необхідно надати доступ до галереї"
      );
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
        .map((asset, index) => ({
          id: `temp-${Date.now()}-${index}`,
          url: `data:image/jpeg;base64,${asset.base64}`,
          userPostId: postData?.id || 0,
        }));

      if (images.length + newImages.length > 10) {
        Alert.alert("Увага", "Максимальна кількість зображень - 10");
        return;
      }

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isValidUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return urlPattern.test(url);
  };

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
              onError={() => console.warn(`Не вдалося завантажити зображення: ${img.url}`)}
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
                    setValue((prev: string[]) => {
                      const newValue = typeof callback === "function" ? callback(prev) : callback;
                      const uniqueValues = Array.from(new Set(newValue)).map(String) as string[];
                      console.log("Оновлені теги:", uniqueValues);
                      return uniqueValues;
                    });
                  }}
                  setItems={setItems}
                  multiple={true}
                  min={0}
                  max={5}
                  mode="BADGE"
                  badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926"]}
                  placeholder="Оберіть теги"
                  searchable={true}
                  searchPlaceholder="Пошук тегів..."
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
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
                    }}
                  >
                    <Text style={{ color: "#0369a1", fontSize: 14 }}>{tag}</Text>
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