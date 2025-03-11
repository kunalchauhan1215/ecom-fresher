import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const Details = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity >
                <Text style={styles.text}>Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Details;
