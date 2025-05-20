import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import Pencil from "../../../../shared/ui/icons/pencil";
import { useRouter } from "expo-router";
import Dots from "../../../../shared/ui/icons/dots";
import { useState, useEffect } from "react";
import { styles } from "./modal-post.style";
import { ChangePostModal } from "../change-post/change-post";
import { DELETE } from "../../../../shared/api/delete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePosts } from "../../hooks/use-get-post";

export function ModalPost({
  visible,
  onClose,
  postId,
  dotsPosition,
  containerSize,
  scrollOffset = 0,
  initialPosition,
}: {
  visible: boolean;
  onClose: () => void;
  postId: number;
  dotsPosition: { x: number; y: number };
  containerSize: { width: number; height: number };
  scrollOffset?: number;
  initialPosition?: { x: number; y: number };
}) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [tokenUser, setTokenUser] = useState<string>("");
  const { posts, setPosts } = usePosts();

  const getToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("token");
    return token || "";
  };

  useEffect(() => {
    getToken().then(setTokenUser);
  }, []);

  const modalWidth = 343;
  const modalHeight = 140;

	const { height: screenHeight } = Dimensions.get("window");

	const adjustedX = dotsPosition.x - modalWidth + 145;
	const adjustedY = dotsPosition.y - scrollOffset - 5;
	const clampedY = Math.min(Math.max(adjustedY, 0), screenHeight - modalHeight);

  async function handleDelete(postId: number) {
    try {
      await fetch(`http://192.168.1.104:3000/posts/${postId}`, { method: "DELETE" }); 
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {modalOpened ? (
        <ChangePostModal
          modalVisible={modalOpened}
          postData={{
            id: postId,
            name: "name",
            theme: "posts.theme",
            text: "posts.text",
            links: "posts.links",
            images: ["posts.images"],
            tags: ["posts.tags"],
          }}
          changeVisibility={() => {
            setModalOpened(!modalOpened);
          }}
        />
      ) : null}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.modalContainer,
            {
              position: "absolute",
              top: adjustedY,
              left: adjustedX,
            },
          ]}
        >
          <View style={styles.dotsContainer}>
            <Dots style={styles.dotsIcon} />
          </View>

          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              setModalOpened(true);
              onClose();
            }}
          >
            <Pencil style={styles.icon} />
            <Text style={styles.optionText}>Редагувати допис</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              console.log("Delete pressed");
              handleDelete(postId);
              onClose();
            }}
          >
            <Image
              source={require("../../../../shared/ui/images/trash.png")}
              style={{ width: 20, height: 24 }}
            />
            <Text style={[styles.optionText, styles.deleteText]}>
              Видалити публікацію
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}