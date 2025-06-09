import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { styles } from "./my.style";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { IAlbum, IAlbumImg } from "../../types/albums.types";
import { useUserContext } from "../../../auth/context/user-context";
import { PUT } from "../../../../shared/api/put";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../settings";

interface IAlbumProps {
  albums: IAlbum[];
}

export function My(props: IAlbumProps) {
  const [images, setImages] = useState<IAlbumImg[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
  const [tokenUser, setTokenUser] = useState<string>("");
  const { user } = useUserContext();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const { albums } = props;

  const correctAlbums = albums.filter((album) => album.authorId === user?.id);

  const minAlbum: IAlbum | null = correctAlbums.reduce(
    (min: IAlbum | null, album: IAlbum) => {
      if (!min || album.id < min.id) {
        return album;
      }
      return min;
    },
    null
  );

  const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("tokenStorage");
    return token || "";
  };

  useEffect(() => {
    getToken().then(setTokenUser);
    if (minAlbum?.images && Array.isArray(minAlbum.images)) {
      setImages(minAlbum.images);
    }
  }, [minAlbum]);

  async function onSearch() {
    try {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Дозвіл не надано",
          "Для додавання зображень необхідно надати доступ до галереї"
        );
        return;
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 0.5,
        allowsEditing: false,
        base64: true,
      });

      if (!result.canceled && result.assets) {
        const allowedFormats = ["jpeg", "png", "gif"];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

        const newImages = await Promise.all(
          result.assets
            .filter((asset) => {
              const type = asset.mimeType?.split("/")[1]?.toLowerCase() || "";
              return asset.base64 && allowedFormats.includes(type);
            })
            .map(async (asset, index) => {
              const base64String = asset.base64!;
              const estimatedSizeInBytes = (base64String.length * 3) / 4;
              if (estimatedSizeInBytes > maxSizeInBytes) {
                Alert.alert(
                  "Помилка",
                  `Зображення занадто велике (макс. 5 МБ)`
                );
                return null;
              }
              const imageUrl = `data:image/${asset.mimeType?.split("/")[1] || "jpeg"
                };base64,${base64String}`;

              const imageKey = `${Date.now() + index}`;
              setImageDimensions((prev) => ({
                ...prev,
                [imageKey]: { width: 150, height: 150 },
              }));

              return {
                id: Date.now() + index,
                url: imageUrl,
                albumId: minAlbum?.id || 0,
              };
            })
        );

        const filteredImages = newImages.filter(
          (img): img is IAlbumImg => img !== null
        );

        if (images.length + filteredImages.length > 10) {
          Alert.alert("Увага", "Максимальна кількість зображень - 10");
          return;
        }

        setImages((prev) => [...prev, ...filteredImages]);
        setChangeImage(true);
      } else if (result.canceled) {
        Alert.alert("Скасовано", "Вибір зображень було скасовано");
      }
    } catch (error) {
      console.error("Помилка вибору зображення:", error);
      Alert.alert(
        "Помилка",
        `Не вдалося вибрати зображення: ${error instanceof Error ? error.message : "Невідома помилка"
        }`
      );
    }
  }

  function deleteImage(id: number) {
    setImages((prev) => {
      const updatedImages = prev.filter((image) => image.id !== id);
      return updatedImages;
    });
    setImageDimensions((prev) => {
      const updatedDimensions = { ...prev };
      delete updatedDimensions[id];
      return updatedDimensions;
    });
    setChangeImage(true);
  }

  function handleUserImageRemoval() {
    if (!user || !user.image) {
      Alert.alert("Помилка", "Немає зображення користувача для видалення");
      return;
    }
    Alert.alert(
      "Підтвердження",
      "Ви впевнені, що хочете видалити зображення профілю?",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: () => {

            Alert.alert("Успіх", "Зображення профілю видалено");
          },
        },
      ]
    );
  }

  async function save() {
    const formattedImages =
      images.length > 0
        ? { create: images.map((img) => ({ url: img.url })) }
        : undefined;
    try {
      const response = await PUT({
        endpoint: `${API_BASE_URL}/albums/${minAlbum?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        token: tokenUser,
        body: {
          images: formattedImages,
        },
      });

      if (response.status === "success") {
        // setImages([]);
        setChangeImage(false);
      } else {
        Alert.alert("Помилка", "Не вдалося зберегти зображення");
      }
    } catch (err) {
      console.error("Помилка збереження:", err);
      Alert.alert("Помилка", "Не вдалося зберегти зображення");
    }
  }

  function normalizeImageUrl(url: string | undefined): { uri: string } {
    if (!url) return { uri: "https://via.placeholder.com/162" };
    if (url.startsWith("data:image") || url.startsWith("http://") || url.startsWith("https://")) {
      return { uri: url };
    }
    const relativeUrl = url.replace(/\\/g, "/").replace(/^\/?uploads\/*/i, "");
    return { uri: `${API_BASE_URL}/uploads/${relativeUrl}` };
  }

  if (!user) {

    return (
      <View style={styles.container}>
        <Text>Користувач не авторизований</Text>
      </View>
    );
  }

  const userImageSource = user.image
    ? {uri: API_BASE_URL+"/"+user.image}
    : require("../../../../shared/ui/images/user.png");
  console.log(userImageSource)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainBox}>
          <Text style={styles.title}>Мої фото</Text>

          <TouchableOpacity style={styles.addButton} onPress={onSearch}>
            <Image
              source={require("../../../../shared/ui/images/add-picture.png")}
              style={styles.addButtonIcon}
            />
            <Text style={styles.addButtonText}>Додати фото</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={userImageSource}
              style={styles.avatar}
            />
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../../shared/ui/images/eye-my-publication.png")}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleUserImageRemoval}
              >
                <Image
                  source={require("../../../../shared/ui/images/trash.png")}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {images.length > 0 ? (
            images.map((image) => (
              <View key={image.id} style={styles.imageWrapper}>
                <Image
                  source={normalizeImageUrl(image.url)}
                  style={styles.avatar}
                />
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Image
                      source={require("../../../../shared/ui/images/eye-my-publication.png")}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => deleteImage(image.id)}
                  >
                    <Image
                      source={require("../../../../shared/ui/images/trash.png")}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            null
          )}
        </View>

        {changeImage && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.addButton} onPress={save}>
              <Text style={styles.addButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}