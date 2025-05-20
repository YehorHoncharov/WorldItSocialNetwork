import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Like from "../../../../shared/ui/icons/like";
import { IPost, IPostImg } from "../../types/post";
import { styles } from "./content.styles";

export function Content(props: IPost) {
  const BASE_URL = "http://192.168.1.104:3000/";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkServerAvailability();
  }, []);

  const checkServerAvailability = async () => {
    try {
      const response = await fetch(BASE_URL);
      console.log('Server status:', response.status);
      setIsLoading(false);
    } catch (error) {
      console.error('Server error:', error);
      setIsLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    
    let correctedPath = imagePath;
    if (imagePath.startsWith('uploads') && !imagePath.startsWith('uploads/')) {
      correctedPath = `uploads/${imagePath.substring(7)}`;
    }
    
    const fullUrl = `${BASE_URL}${correctedPath}`;
    console.log('Image URL:', fullUrl);
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
      <View style={rowImages.length === 2 ? styles.twoImageContainer : styles.threeImageContainer}>
        {rowImages.map((imageItem) => {
          const imageUrl = getImageUrl(imageItem.url);
          if (!imageUrl) return null;

          return (
            <View 
              key={`img-${imageItem.id}`} 
              style={rowImages.length === 2 ? styles.imageHalf : styles.imageThird}
            >
              <Image
                style={styles.image}
                source={{ uri: imageUrl }}
                resizeMode="cover"
                onError={(e) => console.log('Image error:', e.nativeEvent.error)}
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

  if (!props.images || props.images.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Немає зображень для відображення</Text>
      </View>
    );
  }

  const groupedImages = groupImages(props.images);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{props.name}</Text>
        <Text>{props.theme}</Text>
        <Text>{props.links}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>

      <FlatList
        data={groupedImages}
        renderItem={renderRow}
        keyExtractor={(item, index) => `row-${index}`}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
      />

      <View style={styles.postStatsContainer}>
        <View style={styles.postButs}>
          <TouchableOpacity>
            <Like width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.statText}>{123} Вподобань</Text>
        </View>
        <View style={styles.postButs}>
          <TouchableOpacity>
            <Image
              style={styles.eyeIcon}
              source={require("./../../../../shared/ui/images/eye.png")}
            />
          </TouchableOpacity>
          <Text style={styles.statText}>{890} Переглядів</Text>
        </View>
      </View>
    </View>
  );
}