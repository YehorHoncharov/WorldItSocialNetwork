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
import { IAlbum, IAlbumImg, IAlbumProps, IPutResponse } from "../../types/albums.types";
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
  const [userImageSource, setUserImageSource] = useState<
    { uri: string } | NodeRequire
  >();
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
    if (user?.image) {
      setUserImageSource({
        uri: `${API_BASE_URL}/${user.image.replace(/^\/?uploads\/*/i, "uploads/")}`,
      });
    } else {
      setUserImageSource(require("../../../../shared/ui/images/user.png"));
    }
  }, [minAlbum, user]);

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
                id: Date.now() + index, // Тимчасовий ID для фронтенду
                url: imageUrl,
                albumId: minAlbum?.id || 0,
              };
            })
        );

        const filteredImages = newImages.filter(
          (img): img is IAlbumImg => img !== null
        );

        if (
          images.length + filteredImages.length - imagesToDelete.length >
          10
        ) {
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
    const imageToDelete = images.find((image) => image.id === id);
    if (!imageToDelete) {
      Alert.alert("Помилка", "Зображення не знайдено");
      return;
    }

    if (!imageToDelete.url.startsWith("data:image")) {
      setImagesToDelete((prev) => [...prev, id]);
    }

    setImages((prev) => prev.filter((image) => image.id !== id));
    setImageDimensions((prev) => {
      const updatedDimensions = { ...prev };
      delete updatedDimensions[id];
      return updatedDimensions;
    });
    setChangeImage(true);
  }

  async function handleUserImageRemoval() {
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
          onPress: async () => {
            try {
              const response = await PUT({
                endpoint: `${API_BASE_URL}/users/${user.id}`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${tokenUser}`,
                },
                token: tokenUser,
                body: { image: null },
              });

              if (response.status === "success") {
                // Оновлюємо userImageSource замість user
                setUserImageSource(
                  require("../../../../shared/ui/images/user.png")
                );
                Alert.alert("Успіх", "Зображення профілю видалено");
              } else {
                throw new Error(
                  response.message || "Не вдалося видалити зображення профілю"
                );
              }
            } catch (error) {
              console.error("Помилка видалення зображення профілю:", error);
              Alert.alert(
                "Помилка",
                `Не вдалося видалити зображення: ${error instanceof Error ? error.message : "Невідома помилка"
                }`
              );
            }
          },
        },
      ]
    );
  }

  async function save() {
    try {
      var formattedImages = {
        create: images
          .filter((img) => img.url.startsWith("data:image"))
          .map((img) => ({ url: img.url })),
        delete: imagesToDelete.map((id) => ({ id })),
      };
      // formattedImages.create.push(user?.image ? { url: user.image } : { url: "" });

      const response: IPutResponse = await PUT({
        endpoint: `${API_BASE_URL}/albums/${minAlbum?.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        token: tokenUser,
        body: {
          images:
            formattedImages.create.length > 0 ||
              formattedImages.delete.length > 0
              ? formattedImages
              : undefined,
        },
      });

      if (response.status === "success" && response.data) {
        setImages(response.data.images || []);
        setImagesToDelete([]);
        setChangeImage(false);
        Alert.alert("Успіх", "Зміни успішно збережено");
      } else {
        console.log("Помилка збереження!")
      }
      Alert.alert("Успіх", "Зміни успішно збережено");
    } catch (err) {
      console.error("Помилка збереження:", err);
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
          <View style={styles.imageWrapper}>
            <Image
              source={
                userImageSource ||
                require("../../../../shared/ui/images/user.png")
              }
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
          ) : null}
        </View>

        {changeImage && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={[styles.addButton, { width: "50%" }]} onPress={save}>
              <Text style={styles.addButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
