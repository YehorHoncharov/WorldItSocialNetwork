import React from 'react';
import { View } from 'react-native';
import { Providers } from '../providers';
import { Homepage } from '../../modules/home/homepage';
import { StyleSheet } from 'react-native';


export default function MainPage() {
    return (
        <Providers>
            <View style={styles.container}>
                <Homepage />
            </View>
        </Providers>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxWidth: 800,
        gap: 10,
        paddingBottom: 20,
    }
});