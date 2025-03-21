import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Cart from '../../pages/CartPage/Cart';
import Product from '../../pages/Products/Product';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const RouteManager = () => {
  const cartData = useSelector(state => state.cart?.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cartData.map(item => {
      total = total + item.quantity;
    });
    return total;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="product"
        screenOptions={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('cart')}>
              {' '}
              <Image
                style={styles.cartImage}
                source={require('../assests/icons/shopping-cart.png')}
              />
              {getTotalQuantity() > 0 && <Text style={styles.cartQuantity}>{getTotalQuantity()}</Text>}
            </TouchableOpacity>
          ),
        })}>
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="product" component={Product} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        {/* <Stack.Screen name="addToCart" component={AddToCart} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteManager;

const styles = StyleSheet.create({
  cartImage: {
    width: 30,
    height: 30,
    padding: 20,
    marginRight: 20,
    elevation: 1,
    backgroundColor: '#fffffff',
  },
  cartQuantity: {
    backgroundColor: 'red',
    width: 20,
    textAlign: 'center',
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
    top: 2,
    right: 10,
  },
});