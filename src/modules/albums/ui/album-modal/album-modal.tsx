import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
} from "react-native";
import Pencil from "../../../../shared/ui/icons/pencil";
import Dots from "../../../../shared/ui/icons/dots";
import { useState, useEffect } from "react";
import { DELETE } from "../../../../shared/api/delete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlbums } from "../../hooks/useAlbums";
import { styles } from "../../../post/ui/modal-post/modal-post.style";
import { EditAlbumModal } from "../edit-album-modal/edit-album-modal";
import { IAlbum, IAlbumEditProps } from "../../types/albums.types";

interface ModalAlbumProps {
    visible: boolean;
    onClose: () => void;
    albumId: number;
    dotsPosition: { x: number; y: number };
    containerSize: { width: number; height: number };
    scrollOffset?: number;
}

export function ModalAlbum({
    visible,
    onClose,
    albumId,
    dotsPosition,
    scrollOffset = 0,
}: ModalAlbumProps) {
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [tokenUser, setTokenUser] = useState<string | null>(null);
    const { albums, setAlbums } = useAlbums();

    const getToken = async (): Promise<string | null> => {
        return await AsyncStorage.getItem("token");
    };

    useEffect(() => {
        getToken().then(setTokenUser);
    }, []);

    const modalWidth = 343;
    const modalHeight = 140;
    const { height: screenHeight } = Dimensions.get("window");

    const adjustedX = Math.max(0, dotsPosition?.x ? dotsPosition.x - modalWidth + 158 : 0);
    const adjustedY = dotsPosition?.y ? dotsPosition.y - scrollOffset - 5 : 0;
    const clampedY = Math.min(Math.max(adjustedY, 0), screenHeight - modalHeight);

    async function handleDelete(albumId: number) {
        if (!tokenUser) {
            console.error("No token found");
            return;
        }
        try {
            await DELETE({
                endpoint: `http://192.168.1.106:3000/albums/${albumId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenUser}`,
                },
                token: tokenUser,
            });
            setAlbums(albums.filter((album: IAlbum) => album.id !== albumId));
            onClose();
        } catch (error: any) {
            console.error("Помилка видалення:", error.message);
        }
    }

    const currentAlbum = albums.find((album: IAlbum) => album.id === albumId);

    if (!currentAlbum) {
        return null;
    }

    return (
        <>
            {modalOpened && (
                <EditAlbumModal
                    modalVisible={modalOpened}
                    albumId={albumId}
                    initialData={{
                        name: currentAlbum.name,
                        theme: currentAlbum.topic,

                    }}
                    changeVisibility={() => setModalOpened(false)}
                    onClose={() => {
                        setModalOpened(false);
                        onClose();
                    }}
                    onUpdate={(updatedAlbum: IAlbumEditProps) => {
                        setAlbums(
                            albums.map((album: IAlbumEditProps) =>
                                album.id === updatedAlbum.id ? updatedAlbum : album
                            )
                        );
                    }}
                />
            )}
            <Modal
                transparent={true}
                animationType="fade"
                visible={visible && !modalOpened}
                onRequestClose={onClose}
            >
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
                                top: clampedY,
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
                            }}
                        >
                            <Pencil style={styles.icon} />
                            <Text style={styles.optionText}>Редагувати альбом</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity
                            style={styles.modalOption}
                            onPress={() => handleDelete(albumId)}
                        >
                            <Image
                                source={require("../../../../shared/ui/images/trash.png")}
                                style={{ width: 20, height: 24 }}
                            />
                            <Text style={[styles.optionText, styles.deleteText]}>
                                Видалити альбом
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}