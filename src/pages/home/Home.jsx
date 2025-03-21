import {

    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import products from '../../productss.json';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductRequest, toggleLike } from '../../redux/modules/products/productSlice';
import { decreaseQuantity, increaseQuantity } from '../../redux/modules/cart/cartSlice';
import AddToCart from '../../components/AddToCart';



// const Home = ({userdata}) => {
const Home = () => {
    const dispatch = useDispatch();


    const getAllProducts = products?.products;





    useEffect(() => {
        console.log("init");
        
        dispatch(fetchProductRequest(getAllProducts));
    }, []);

    const cart = useSelector(state => state.cart.cart);
    const fetchedproducts = useSelector(state => state.product?.product);
    // Function to find product quantity in cart
    const getProductQuantity = productId => {
        const productInCart = cart.find(item => item.id === productId);
        return productInCart ? productInCart.quantity : 0; //
    };

    const renderItems = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity
                style={[
                    styles.LikeButton,
                    item.liked ? styles.likedButton : styles.unlikedButton,
                ]}
                onPress={() => dispatch(toggleLike(item.id))}>
                <Text style={styles.buttonText}>{item.liked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <Image
                source={{
                    uri: item.thumbnail,
                }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>Title:{item.title}</Text>
                <Text style={styles.description}>Description:{item.description}</Text>
                <Text style={styles.title}>Price: ${item.price}</Text>
                <View style={{ margin: 10 }}>
                    {getProductQuantity(item.id) > 0 ? (
                        <View style={styles.container}>
                            <TouchableOpacity
                                style={styles.button}
                                title="+"
                                onPress={() => dispatch(increaseQuantity(item.id))}>
                                <Text style={styles.quantitybuttonText}>+</Text>
                            </TouchableOpacity>{' '}
                            <Text style={styles.quantityText}>
                                {getProductQuantity(item.id)}
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                title="+"
                                onPress={() => dispatch(decreaseQuantity(item.id))}>
                                <Text style={styles.quantitybuttonText}>-</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <AddToCart data={item} />
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <View>
            {/* <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.ProfileButton}
            onPress={() => navigation.navigate('cart')}>
            <Text style={styles.LoginButtonText}>Cart</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.LoginButton}
            onPress={() => dispatch(clearCart())}>
            <Text style={styles.LoginButtonText}>CLEAR CART</Text>
          </TouchableOpacity>
        </View> */}

            {/* <Text style={styles.productHeading}>Products from json</Text> */}
            {fetchedproducts ? (
                <SafeAreaView>
                    <FlatList
                        data={fetchedproducts}
                        keyExtractor={item => item.id}
                        renderItem={renderItems}
                        style={styles.list}
                    />
                </SafeAreaView>
            ) : (
                'no products found'
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    username: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'semibold',
    },
    LoginText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    LoginButtonText: {
        fontSize: 20,
        // width: '100%',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    LoginButton: {
        padding: 10,
        backgroundColor: 'red',
        flexDirection: 'row',
        margin: 10,
        width: '45%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileButton: {
        padding: 10,
        width: '45%',
        backgroundColor: 'cyan',
        flexDirection: 'row',
        margin: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ShowButton: {
        padding: 8,
        width: '35%',
        backgroundColor: 'brown',
        flexDirection: 'row',
        margin: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10, // Android shadow
        margin: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    content: {
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 15,
        color: '#666',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    products: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10, // Android shadow
        margin: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        backgroundColor: 'purple',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Shadow effect
    },

    quantityText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    quantitybuttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    LikeButton: {
        backgroundColor: 'purple',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    list: {
        marginBottom: 15
    }
});




// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Product from '../products/Product';
// const Home = () => {
//     const navigation = useNavigation();
//     const handleHome = () => {
//         navigation.navigate('Profile')
//     }
//     return (
//         <View style={styles.container}>
//           <Product/>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//     },
// });

// export default Home;



// import React from 'react';
// import SwiperTest from './SwiperTest'; // Import the SwiperTest component

// const Home = () => {
//   return (
//     <SwiperTest />
//   );
// };

// export default Home;





// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const Home = () => {
//     const navigation = useNavigation();
//     const handleHome = () => {
//         navigation.navigate('Profile')
//     }
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={handleHome}>
//                 <Text style={styles.text}>Home</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//     },
// });

// export default Home;


