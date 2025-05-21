import React, { useState } from 'react';
import { FlatList, RefreshControl, View, Text } from 'react-native';

import Post from '../post/ui/main-page/main.page';
import { usePosts } from '../post/hooks/use-get-post';

export function Homepage() {
    const { posts, refetch } = usePosts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            console.error('Refresh error:', error);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View >
                    <Post
                        id={item.id}
                        name={item.name}
                        text={item.text}
                        images={item.images}
                        user={item.user}
                    />
                </View>
            )}

            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#000000']}
                    progressBackgroundColor="#FFFFFF"
                />
            }
            ListEmptyComponent={
                <View >
                    <Text>Нет постов для отображения</Text>
                </View>
            }
            // style={styles.flatList}
        />
    );
}

// const styles = StyleSheet.create({
//     flatList: {
//         flex: 1,
//         backgroundColor: "#FAF8FF",
//     },
//     contentContainer: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         gap: 10,
//         alignItems: "center",
//     },
//     postContainer: {
//         width: "100%",
//         maxWidth: 800,
//         backgroundColor: "#ffffff",
//         borderRadius: 10,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 50,
//     },
// });