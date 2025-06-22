import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import Pencil from "../../../../shared/ui/icons/pencil";
import Dots from "../../../../shared/ui/icons/dots";
import { useState, useEffect } from "react";
import { DELETE } from "../../../../shared/api/delete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlbums } from "../../hooks/useAlbums";
import { styles } from "../../../post/ui/modal-post/modal-post.style";
import { EditAlbumModal } from "../edit-album-modal/edit-album-modal";
import { AlbumUpdateBody, IAlbum, IAlbumEditProps } from "../../types/albums.types";
import { useUserContext } from "../../../auth/context/user-context";

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
    const { albums, setAlbums, refetch } = useAlbums();
    const { user } = useUserContext()

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
            setAlbums(prevAlbums => prevAlbums.filter((album: IAlbum) => album.id !== albumId));
        
        await DELETE({
            endpoint: `http://192.168.1.104:3000/albums/${albumId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
            token: tokenUser,
        });
        
        Alert.alert(
            "Успіх",
            "Ваш альбом успішно видалився!"
        );
        onClose();
        await refetch(); 
    } catch (error: any) {
        console.error("Помилка видалення:", error.message);

        await refetch();
    }
    }

    const currentAlbum = albums.find((album: IAlbum) => album.id === albumId);

    if (!currentAlbum) {
        return null;
    }

    const prepareUpdateData = (albumData: IAlbumEditProps): AlbumUpdateBody => {
        return {
            name: albumData.name,
            tags: albumData.topic ? albumData.topic.map((topic) => topic.tag.name) : undefined,
            images: currentAlbum.images?.map(img => ({
                image: {
                    id: img.image.id,
                    filename: img.image.filename
                }
            })),
            author_id: user?.id
        };
    };

    return (
        <>
            {modalOpened && (
                <EditAlbumModal
                    modalVisible={modalOpened}
                    album_id={albumId}
                    initialData={{
                        name: currentAlbum.name,
                        topic: currentAlbum.topic?.find?.name,
                    }}
                    changeVisibility={() => setModalOpened(false)}
                    onClose={() => {
                        setModalOpened(false);
                        onClose();
                    }}
                    onUpdate={(updatedAlbum: IAlbum) => {
                        const updateData = prepareUpdateData(updatedAlbum);

                        setAlbums(
                            albums.map((album: IAlbum) =>
                                album.id === updatedAlbum.id
                                    ? {
                                        ...album,
                                        name: updatedAlbum.name,
                                        topic: updatedAlbum.topic
                                            ? updatedAlbum.topic
                                            : album.topic
                                    }
                                    : album
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