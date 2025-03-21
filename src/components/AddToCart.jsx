import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import { addToCartRequest } from '../redux/modules/cart/cartSlice';


const AddToCart = ({data}) => {
  const dispatch = useDispatch();
  const handleAddToCart = data => {
    dispatch(addToCartRequest(data));
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(data)}>
        <Text style={styles.quantitybuttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    elevation: 3, // Shadow effect
  },
  quantitybuttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'semibold',
    paddingHorizontal:3
  },
});