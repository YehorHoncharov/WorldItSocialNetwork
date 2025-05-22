import React, { useEffect, useState, useMemo } from "react";
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
  StyleSheet
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
import { Props, TagItem, UpdateData } from "./types";
import { styles } from "./change-post.styles";

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
  const [images, setImages] = useState<string[]>([]);
  const [tokenUser, setTokenUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [items, setItems] = useState<TagItem[]>([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Ananas', value: 'ananas' },
  ]);

  const API_BASE_URL = "http://192.168.1.104:3000";

  const normalizedImages = useMemo(() => {
    if (!postData?.images) return [];
    return postData.images.map(img => {
      const uri = img.url;
      if (!uri) return null;
      if (uri.startsWith('http') || uri.startsWith('https') || uri.startsWith('data:image')) {
        return uri;
      }
      return `${API_BASE_URL}/${uri.startsWith('/') ? uri.slice(1) : uri}`;
    }).filter((uri): uri is string => !!uri);
  }, [postData?.images]);

  useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem("token");
      setTokenUser(token || "");

      if (postData) {
        setName(postData.name || "");
        setTheme(postData.theme || "");
        setText(postData.text || "");
        setLinks(postData.links || "");
        setImages(normalizedImages);
        setValue(postData.tags?.map(tag => tag.tag.name) || []);
      }
    };

    if (modalVisible) {
      loadData();
    }
  }, [modalVisible, postData, normalizedImages]);

  const handleSubmit = async () => {
    if (!postData) return;
    
    if (!name || !theme || !text) {
      Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
      return;
    }

    if (!user) {
      Alert.alert("Помилка", "Ви не авторизовані для редагування посту");
      return;
    }

    if (links && !isValidUrl(links)) {
      Alert.alert("Помилка", "Введіть валідне посилання");
      return;
    }

    const updatedData: UpdateData = {
      name,
      theme,
      text,
      links: links || undefined,
      tags: value,
    };

    const newImages = images.filter(uri => 
      uri.startsWith('data:image') && !normalizedImages.includes(uri)
    );
    
    const deletedImages = normalizedImages.filter(uri => 
      !images.includes(uri)
    ).map(uri => 
      uri.replace(`${API_BASE_URL}/`, '')
    );

    if (newImages.length > 0 || deletedImages.length > 0) {
      updatedData.images = {
        ...(newImages.length > 0 ? { create: newImages.map(url => ({ url })) } : {}),
        ...(deletedImages.length > 0 ? { delete: deletedImages } : {})
      };
    }

    setIsLoading(true);
    try {
      await PUT({
        endpoint: `${API_BASE_URL}/posts/${postData.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: updatedData,
      });

      changeVisibility();
      Alert.alert("Успіх", "Публікацію успішно оновлено");
    } catch (err: any) {
      console.error("Помилка при оновленні поста:", err);
      Alert.alert("Помилка", err.message || "Не вдалося оновити публікацію");
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = async () => {
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
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!postData) {
    return null;
  }

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
            <Text style={styles.modalTitle}>Редагування публікації</Text>
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
              <TextInput
                style={styles.textArea}
                placeholder="Введіть опис публікації"
                value={text}
                onChangeText={setText}
                multiline
              />
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
                  placeholder="Оберіть тег"
                />
              </View>
              <View style={styles.selectedTagsContainer}>
                {value.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.imageGrid}>
              {images.length > 0 ? (
                images.map((uri, idx) => (
                  <View key={`${uri}-${idx}`} style={styles.imageContainer}>
                    <Image
                      source={{ uri }}
                      style={styles.imageAdded}
                      onError={() => console.warn("Failed to load image:", uri)}
                    />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={() => removeImage(idx)}
                    >
                      <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                  </View>
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
                  <SendArrow style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}