import React from 'react';
import { View, Text, TouchableOpacity, StyleSheetsa } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Dashboard = () => {
    const navigation: any = useNavigation();
    const handleHome = () => {
        navigation.navigate('Details')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleHome}>
                <Text style={styles.text}>Dashboard</Text>
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

export default Dashboard;
