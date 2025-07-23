import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { styles } from "./my.style";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { IAlbum, IAlbumImageShow, IAlbumImg, IAlbumProps, IPutResponse } from "../../types/albums.types";
import { useUserContext } from "../../../auth/context/user-context";
import { PUT } from "../../../../shared/api/put";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../settings";

export function My(props: IAlbumProps) {
  const [images, setImages] = useState<IAlbumImg[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
  const [tokenUser, setTokenUser] = useState<string>("");
  const { user } = useUserContext();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const { albums } = props;

  const correctAlbums = albums.filter((album) => album.author_id === user?.id);

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
  }, [user]);

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
        quality: 0.8,
        allowsEditing: false,
        base64: true,
      });

      if (!result.canceled && result.assets) {
        const allowedFormats = ["jpeg", "png", "gif"];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

        const newImages: IAlbumImageShow[] = result.assets
          .map((asset, index) => {
            if (!asset.mimeType || !asset.base64) {
              Alert.alert(
                "Помилка",
                "Вибране зображення не підтримується або не містить даних."
              );
              return null;
            }
            const type = asset.mimeType.split("/")[1]?.toLowerCase();
            if (!allowedFormats.includes(type)) {
              Alert.alert(
                "Помилка",
                `Формат зображення ${type} не підтримується. Дозволені формати: ${allowedFormats.join(", ")}.`
              );
              return null;
            }
            const base64String = asset.base64;
            const estimatedSizeInBytes = (base64String.length * 3) / 4;
            if (estimatedSizeInBytes > maxSizeInBytes) {
              Alert.alert(
                "Помилка",
                `Зображення занадто велике. Максимальний розмір: ${maxSizeInBytes / (1024 * 1024)} MB`
              );
              return null;
            }
            const url = `data:image/${type};base64,${base64String}`;

            return {
              image: {
                id: Date.now() + index,
                filename: url,
              },
            };
          })
          .filter((img): img is IAlbumImageShow => img !== null);

        if (images.length + newImages.length > 10) {
          Alert.alert("Увага", "Максимальна кількість зображень - 10");
          return;
        }
        setChangeImage(true);
        setImages((prev) => [...prev, ...newImages]);
      } else if (result.canceled) {
        Alert.alert("Скасовано", "Вибір зображень було скасовано");
      }
    } catch (error) {
      Alert.alert(
        "Помилка",
        `Не вдалося вибрати зображення: ${error instanceof Error ? error.message : "Невідома помилка"}`
      );
    }
  }

  function deleteImage(id: number) {
    const imageToDelete = images.find((image) => image.image.id === id);
    if (!imageToDelete) {
      Alert.alert("Помилка", "Зображення не знайдено");
      return;
    }

    if (!imageToDelete.image.filename.startsWith("data:image")) {
      setImagesToDelete((prev) => [...prev, id]);
    }

    setImages((prev) => prev.filter((image) => image.image.id !== id));
    setImageDimensions((prev) => {
      const updatedDimensions = { ...prev };
      delete updatedDimensions[id];
      return updatedDimensions;
    });
    setChangeImage(true);
  }

  async function save() {
    try {
      const formattedImages: IAlbumImageShow[] = [
        ...images,
        ...imagesToDelete.map((id) => ({ image: { id: id, filename: "" } }))
      ];

      const response: IPutResponse = await PUT({
        endpoint: `${API_BASE_URL}/albums/${minAlbum?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        token: tokenUser,
        body: {
          images:
            formattedImages.length > 0 || formattedImages.length > 0
              ? formattedImages
              : undefined,
        },
      });

      if (response.status === "success" && response.data) {
        setImages(response.data.images|| []);
        setImagesToDelete([]);
        setChangeImage(false);
        Alert.alert("Успіх", "Зміни успішно збережено");
      } else {
        console.log("Помилка збереження!");
      }
    } catch (err) {
      console.log("Помилка збереження:", err);
      Alert.alert("Помилка", "Не вдалося зберегти зміни");
    }
  }

  function normalizeImageUrl(url: string | undefined): { uri: string } {
    if (!url) return { uri: "https://via.placeholder.com/162" };
    if (
      url.startsWith("data:image") ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return { uri: url };
    }
    const relativeUrl = url.replace(/^\/?uploads\/*/i, "");
    return { uri: `${API_BASE_URL}/uploads/${relativeUrl}` };
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Користувач не авторизований</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never"
      >
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

        <View style={[styles.imageContainer, { flex: 1 }]}>
          {images.length > 0 ? (
            [...images].map((image) => (
              <View key={image.image.id} style={styles.imageWrapper}>
                <Image
                  source={normalizeImageUrl(image.image.filename)}
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
                    onPress={() => deleteImage(image.image.id)}
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
            <Text>Немає доданих зображень</Text>
          )}
        </View>

        {changeImage && (
          <View style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <TouchableOpacity style={[styles.addButton, { width: "50%" }]} onPress={save}>
              <Text style={styles.addButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}