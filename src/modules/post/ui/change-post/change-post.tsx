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
  ActivityIndicator,
} from "react-native";

import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { IPost } from "../../types/post";
import { useUserContext } from "../../../auth/context/user-context";
import { POST } from "../../../../shared/api/post";
import { styles } from "./change-post.styles";
import Cross from "../../../../shared/ui/icons/cross";
import { Input } from "../../../../shared/ui/input";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import Toast from "react-native-toast-message";
import { PUT } from "../../../../shared/api/put";


interface Props {
  modalVisible: boolean;
  changeVisibility: () => void;
  post?: IPost; 
  refreshPosts?: () => void; 
}

export default function ChangePostModal({ modalVisible, changeVisibility, post, refreshPosts }: Props) {
  const [name, setName] = useState(post?.name || "");
  const [theme, setTheme] = useState(post?.theme || "");
  const [text, setText] = useState(post?.text || "");
  const [links, setLinks] = useState(post?.links || "");
  const [images, setImages] = useState<string[]>(post?.images?.map(img => img.url) || []);
  const [tokenUser, setTokenUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();

  const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("token");
    return token || "";
  };

  useEffect(() => {
    getToken().then(setTokenUser);
    if (post) {
      setName(post.name);
      setTheme(post.theme || "");
      setText(post.text);
      setLinks(post.links || "");
      setImages(post.images?.map(img => img.url) || []);
    } else {
      setName("");
      setTheme("");
      setText("");
      setLinks("");
      setImages([]);
    }
  }, [post, modalVisible]);

  const handleSubmit = async () => {
    if (!name || !theme || !text) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Пожалуйста, заполните обязательные поля',
      });
      return;
    }

    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Вы не авторизованы',
      });
      return;
    }

    setIsLoading(true);

    try {
      const formattedImages = images.length > 0 
        ? { 
            create: images.map(url => ({ 
              url,
              postId: user.id 
            })) 
          } 
        : undefined;

      if (post) {
        await PUT({
          endpoint: `http://192.168.1.104:3000/posts/update/${post.id}`,
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
          },
        });

        Toast.show({
          type: 'success',
          text1: 'Успех',
          text2: 'Пост успешно обновлен',
        });
      } else {
        await POST({
          endpoint: "http://192.168.1.104:3000/posts/create",
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
            authorId: user.id,
          },
        });

        Toast.show({
          type: 'success',
          text1: 'Успех',
          text2: 'Пост успешно создан',
        });
      }


      if (!post) {
        setName("");
        setTheme("");
        setText("");
        setLinks("");
        setImages([]);
      }
      
      changeVisibility();
      refreshPosts?.();
    } catch (err) {
      console.error("Ошибка:", err);
      Toast.show({
        type: 'error',
        text1: 'Ошибка',
        text2: 'Произошла ошибка при сохранении',
      });
    } finally {
      setIsLoading(false);
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
    setImages(prev => prev.filter((_, i) => i !== index));
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
              {post ? 'Редактирование публикации' : 'Создание публикации'}
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
                    source={require("../../../shared/ui/images/pictures-modal.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#543C52" />
                ) : (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitText}>
                      {post ? 'Обновить' : 'Опубликовать'}
                    </Text>
                    <SendArrow
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <Toast />
    </Modal>
  );
}