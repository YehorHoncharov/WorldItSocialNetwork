import { View, Text, TouchableOpacity, Modal, Image, Animated, StyleSheet } from "react-native";
import Pencil from "../../../../shared/ui/icons/pencil";
import { useRouter } from "expo-router";
import Dots from "../../../../shared/ui/icons/dots";
import { useState, useRef, useEffect } from "react";
import { styles } from "./modal-post.style";

export function ModalPost({ visible, onClose }: { 
    visible: boolean; 
    onClose: () => void;
}) {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const dotsRef = useRef<View>(null);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

    const handleEditPost = () => {
        router.navigate({ pathname: "/change-post" });
    };

    useEffect(() => {
        if (visible) {
            dotsRef.current?.measureInWindow((x, y) => {
                setButtonPosition({ x, y });
            });
            
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.modalOverlay} 
                activeOpacity={1} 
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                            top: buttonPosition.y - 10,
                            right: buttonPosition.x - 343 + 20,
                        },
                    ]}
                >
                    <View style={styles.dotsContainer}>
                        <Dots style={styles.dotsIcon} />
                    </View>

                    <TouchableOpacity 
                        style={styles.modalOption} 
                        onPress={() => {
                            handleEditPost();
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
                            onClose();
                        }}
                    >
                        <Image
                            source={require("../../../../shared/ui/images/trash.png")}
                            style={styles.icon}
                        />
                        <Text style={[styles.optionText, styles.deleteText]}>Видалити публікацію</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
}