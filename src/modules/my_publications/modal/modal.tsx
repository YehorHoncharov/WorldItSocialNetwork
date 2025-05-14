import React, { useState } from "react";
import {
	Modal,
	Pressable,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
} from "react-native";
import Cross from "../../../shared/ui/icons/cross";
import SendArrow from "../../../shared/ui/icons/send-arrow";
import { Input } from "../../../shared/ui/input";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

interface Props {
	modalVisible: boolean;
	changeVisibility: () => void;
	onSubmit?: (data: {
		title: string;
		topic: string;
		description: string;
		link: string;
	}) => void;
}

export function MyPublicationModal({
	modalVisible,
	changeVisibility,
	onSubmit,
}: Props) {
	const [title, setTitle] = useState("");
	const [topic, setTopic] = useState("");
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [images, setImages] = useState<string[]>([]);

	const handleSubmit = () => {
		if (title && topic && description) {
			changeVisibility();
			setTitle("");
			setTopic("");
			setDescription("");
			setLink("");
			setImages([]);
			// Optionally call onSubmit here
			if (onSubmit) {
				onSubmit({ title, topic, description, link });
			}
		}
	};

	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync();
		if (result.status === "granted") {
			const imagesResult = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsMultipleSelection: true,
				selectionLimit: 10,
				base64: false,
			});

			if (imagesResult.assets) {
				const uris = imagesResult.assets.map((asset) => asset.uri);
				setImages((prev) => [...prev, ...uris]);
			}
		}
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
						<Text style={styles.modalTitle}>Створення публікації</Text>
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
								value={title}
								onChangeText={setTitle}
							/>
							<Input
								width={343}
								label="Тема публікації"
								placeholder="Напишіть тему публікації"
								value={topic}
								onChangeText={setTopic}
							/>
							<View>
								<TextInput
									style={styles.textArea}
									placeholder="Введіть опис публікації"
									value={description}
									onChangeText={setDescription}
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
								value={link}
								onChangeText={setLink}
							/>
						</View>

						<View
							style={styles.imageGrid}
						>
							{images.map((uri, idx) => (
								<Image
									key={idx}
									source={{ uri }}
									style={styles.imageAdded}
									resizeMode="cover"
								/>
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
								<TouchableOpacity>
									<Image
										source={require("../../../shared/ui/images/smile-modal.png")}
										style={styles.icon}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.submitButton}
									onPress={handleSubmit}
								>
									<Text style={styles.submitText}>Публікація</Text>
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

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		width: "100%",
		maxHeight: "80%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "500",
		color: "#070A1C",
	},
	form: {
		gap: 5,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	textArea: {
		width: 343,
		minHeight: 100,
		padding: 16,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		fontSize: 16,
	},
	actions: {
		gap: 16,
		marginTop: 16,
	},
	iconRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},
	icon: {
		width: 40,
		height: 40,
	},
	submitButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#543C52",
		padding: 12,
		borderRadius: 1234,
		gap: 8,
	},
	submitText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	scrollArea: {
		flexGrow: 0,
	},

	imageGrid: {
		flexDirection: "column",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	imageAdded: {
		width: 343,
		height: 225,
		borderRadius: 16,
	},
});