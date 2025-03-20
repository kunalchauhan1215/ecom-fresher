import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Cart = ({ route }) => {
  const { cartItems, onRemoveFromCart } = route.params;

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.cartItemImage} />
      <Text style={styles.cartItemTitle}>{item.title}</Text>
      <TouchableOpacity 
        onPress={() => onRemoveFromCart(item.id)} 
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
  },
  cartItemImage: {
    width: 150, 
    height: 150, 
    borderRadius: 5, 
    marginRight: 10, 
  },
  cartItemTitle: {
    fontSize: 18,
    flex: 1, // Allow title to take remaining space
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#6366f1',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});

export default Cart;
