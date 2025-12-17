import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { IUser } from "../../../../../auth/types";
import { useUserContext } from "../../../../../auth/context/user-context";
import { useUsers } from "../../../../../friends/hooks/useUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST } from "../../../../../../shared/api/post";
import { API_BASE_URL } from "../../../../../../settings";
import { styles } from "./firstStepModal.styles";
import SearchIcon from "../../../../../../shared/ui/icons/search";
import { ContactWithCheckbox } from "../../contact/conntactWithCheckbox";
import { useRouter } from "expo-router";
import { Chat } from "../../../../types/socket";

interface Props {
    modalVisible: boolean;
    onClose: () => void;
}

export function AddFriendModal({ modalVisible, onClose }: Props) {
    const { user: currentUser } = useUserContext();
    const { users } = useUsers();
    const [step, setStep] = useState<1 | 2>(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
    const [groupName, setGroupName] = useState("");
    const [friends, setFriends] = useState<IUser[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) return;

        const myFriends = users.filter(userF =>
            currentUser.friendship_to?.some(f => f.accepted === true && f.profile1_id === userF.id),
        );

        const friendsToAdd = users.filter(userF =>
            currentUser.friendship_from?.some(
                f => f.accepted === true && f.profile2_id === userF.id,
            ),
        );

        const allFriends = [...myFriends, ...friendsToAdd];
        setFriends(allFriends);
    }, [users, currentUser]);

    const filteredFriends = friends.filter(friend =>
        friend.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleToggleFriend = (id: number) => {
        setSelectedFriends(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id],
        );
    };

    const handleContinue = () => {
        if (selectedFriends.length === 0) {
            Alert.alert("Помилка", "Будь ласка, оберіть хоча б одного друга");
            return;
        }
        setStep(2);
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert("Помилка", "Будь ласка, введіть назву групи");
            return;
        }

        if (!currentUser) {
            Alert.alert("Помилка", "Користувач не авторизований");
            return;
        }
        const selectedFriendObjects = friends.filter(friend => selectedFriends.includes(friend.id));

        const members = [currentUser, ...selectedFriendObjects];

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Помилка", "Користувач не авторизований");
                return;
            }

            const response = await POST<Chat>({
                endpoint: `${API_BASE_URL}/chats/create`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                token,
                body: {
                    name: groupName,
                    is_personal_chat: false,
                    admin_id: currentUser.id,
                    members: members,
                    avatar: "uploads/user.png",
                },
            });

            if (response.status === "success") {
                const createdChat = response.data;
                Alert.alert("Успіх", "Група успішно створена!");
                handleCancel();
                router.push({
                    pathname: "/chat",
                    params: {
                        chat_id: createdChat.id,
                        name: groupName,
                        avatar: "uploads/user.png",
                    },
                });
            }
        } catch (err) {
            console.log("Error creating chat/group:", err);
            Alert.alert("Помилка", "Сталася помилка при створенні групи");
        }
    };

    const handleCancel = () => {
        setStep(1);
        setSelectedFriends([]);
        setGroupName("");
        setSearchTerm("");
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {step === 1 ? (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.modalTitle}>Нова група</Text>
                                <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                                    <Text style={styles.closeText}>×</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.searchInput}>
                                <SearchIcon style={{ width: 17, height: 17 }} />
                                <TextInput
                                    placeholder="Пошук..."
                                    value={searchTerm}
                                    onChangeText={setSearchTerm}
                                    style={{ flex: 1, marginLeft: 8 }}
                                />
                            </View>

                            <Text style={styles.friendCount}>
                                Вибрано: {selectedFriends.length}
                            </Text>

                            <ScrollView style={styles.scrollArea} overScrollMode="never">
                                <View style={styles.form}>
                                    {filteredFriends.map(friend => (
                                        <TouchableOpacity
                                            key={friend.id}
                                            style={styles.friendItem}
                                            onPress={() => handleToggleFriend(friend.id)}
                                        >
                                            <ContactWithCheckbox
                                                userContact={friend}
                                                isSelected={selectedFriends.includes(friend.id)}
                                            />
                                            <View style={styles.checkbox}>
                                                {selectedFriends.includes(friend.id) && (
                                                    <Text style={styles.checkmark}>✓</Text>
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>

                            <View style={styles.iconRow}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.submitTextCancel}>Скасувати</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleContinue}
                                >
                                    <Text style={styles.submitText}>Далі</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.modalTitle}>Назва групи</Text>
                                <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                                    <Text style={styles.closeText}>×</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.scrollArea} overScrollMode="never">
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Введіть назву групи"
                                        value={groupName}
                                        onChangeText={setGroupName}
                                    />
                                </View>
                            </ScrollView>

                            <View style={styles.iconRow}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.submitTextCancel}>Скасувати</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleCreateGroup}
                                >
                                    <Text style={styles.submitText}>Створити</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
}
