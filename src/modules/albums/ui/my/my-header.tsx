import { TouchableOpacity, View, Text, Animated, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Settings } from "../../../settings/settings";
import { My } from "./my";
import { Album } from "../album/album";
import { NoAlbums } from "../no-albums/no-albums";


const screenWidth = Dimensions.get("window").width;

export function ProfileHeader() {
    const [activeTab, setActiveTab] = useState('personal');
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        translateX.setValue(0);
    }, []);

    const handleTabPress = (tab: string) => {
        const toValue = tab === 'personal' ? 0 : -screenWidth;
        
        Animated.timing(translateX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
        
        setActiveTab(tab);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.tabContainer]}>
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => handleTabPress('personal')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'personal' && styles.tabTextActive
                    ]}>
                        Особиста інформація
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => handleTabPress('albums')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'albums' && styles.tabTextActive
                    ]}>
                        Альбоми
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={{ flex: 1, width: screenWidth * 2, flexDirection: 'row' }}>
                <Animated.View 
                    style={{
                        flexDirection: 'row',
                        width: screenWidth * 2,
                        transform: [{ translateX }],
                        marginRight: 200
                    }}
                >
                    <View style={{ width: screenWidth, flex: 1, marginBottom: 60 }}>
                        <Settings />
                    </View>
                    
                    <ScrollView overScrollMode="never" contentContainerStyle={{gap : 8 }} style={{ width: screenWidth, flex: 1,}}>
                        <My />
                        <Album />
                        <NoAlbums/>
                    </ScrollView>
                    
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        paddingLeft: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignContent: "center",
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#81818D',
    },
    tabTextActive: {
        color: '#070A1C',
        fontWeight: '700',
        borderBottomWidth: 2,
        borderBottomColor: '#070A1C',
        paddingBottom: 4,
    },
});