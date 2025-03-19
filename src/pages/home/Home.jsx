import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
    const navigation = useNavigation();
    const handleHome = () => {
        navigation.navigate('Profile')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleHome}>
                <Text style={styles.text}>Home</Text>
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

export default Home;



// import React from 'react';
// import SwiperTest from './SwiperTest'; // Import the SwiperTest component

// const Home = () => {
//   return (
//     <SwiperTest />
//   );
// };

// export default Home;

