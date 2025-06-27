import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import Like from "../../../../shared/ui/icons/like";
import { IPost, IPostImg } from "../../types/post";
import { styles } from "./content.styles";
import { API_BASE_URL } from "../../../../settings";

export function Content(props: IPost) {

	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		checkServerAvailability();
	}, []);

	const checkServerAvailability = async () => {
		try {
			const response = await fetch(API_BASE_URL);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	const getImageUrl = (imagePath: string) => {
		if (!imagePath) return null;

		let correctedPath = imagePath;
		if (
			imagePath.startsWith("uploads") &&
			!imagePath.startsWith("uploads/")
		) {
			correctedPath = `uploads/${imagePath.substring(7)}`;
		}

		const fullUrl = `${API_BASE_URL}/${correctedPath}`;

		return fullUrl;
	};
	

	const groupImages = (images: IPostImg[]) => {
		const grouped = [];
		let i = 0;
		let rowType = 0;

		while (i < images.length) {
			const itemsInRow = rowType === 0 ? 2 : 3;
			grouped.push(images.slice(i, i + itemsInRow));
			i += itemsInRow;
			rowType = rowType === 0 ? 1 : 0;
		}

		return grouped;
	};

	const renderRow = ({ item: rowImages }: { item: IPostImg[] }) => {
		return (
			<View
				style={
					rowImages.length === 2
						? styles.twoImageContainer
						: styles.threeImageContainer
				}
			>
				{rowImages.map((imageItem, index) => {
					const imageUrl = getImageUrl(imageItem.post_app_image.filename);
					
					if (!imageUrl) return null;

					return (
						<View
							key={`img-${imageItem.post_app_image.id || `temp-${index}`}`}
							style={[
								rowImages.length === 1 ? styles.imageOne :
									rowImages.length === 2
										? styles.imageHalf
										: styles.imageThird
							]}
						>
							<Image
								style={styles.image}
								source={{ uri: imageUrl }}
								resizeMode="cover"

							/>
						</View>
					);
				})}
			</View>
		);
	};

	if (isLoading) {
		return <ActivityIndicator size="large" />;
	}

	if (!props.post_app_post_images) {
		return
	}

	const groupedImages = groupImages(props.post_app_post_images);

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={{ fontSize: 18 }}>{props.title}</Text>
		
				<Text style={styles.text}>{props.content}</Text>
				{props.post_app_post_tags && props.post_app_post_tags.length > 0 && (
					<View style={styles.tagsContainer}>
						{props.post_app_post_tags.map((tagItem, index) => (
							<View
								key={`tag-${tagItem.post_app_tag.id || `temp-${index}`}`}
								style={styles.tag}
							>
								<Text style={styles.tagText}>
									{tagItem.post_app_tag.name}
								</Text>
							</View>
						))}
					</View>
				)}
			</View>
			{props.post_app_post_images && props.post_app_post_images.length > 0 ? (
				<FlatList
					data={groupedImages}
					renderItem={renderRow}
					keyExtractor={(item, index) => `row-${index}`}
					scrollEnabled={false}
					contentContainerStyle={styles.gridContainer}
				/>
			) : <Text>Немає зображень для відображення</Text>}

			<View style={styles.postStatsContainer}>
				<View style={styles.postButs}>
					<TouchableOpacity>
						<Like width={20} height={20} />
					</TouchableOpacity>
					<Text style={styles.statText}>
						0 Вподобань
					</Text>
				</View>
				<View style={styles.postButs}>
					<TouchableOpacity>
						<Image
							style={styles.eyeIcon}
							source={require("./../../../../shared/ui/images/eye.png")}
						/>
					</TouchableOpacity>
					<Text style={styles.statText}>
						0 Переглядів
					</Text>
				</View>
			</View>
		</View>
	);
}
