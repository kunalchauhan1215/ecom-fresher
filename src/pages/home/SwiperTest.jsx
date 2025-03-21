import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import productsData from '../../products.json'; 
import { useNavigation } from '@react-navigation/native';

const Swiper = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]); // Items in the cart
  const [swipedCards, setSwipedCards] = useState([]); // Previously swiped products (used for "Previous" button)
  const [currentCards, setCurrentCards] = useState(productsData.products); // The stack of products to swipe through

  const addToCart = (product) => {
    setCartItems([...cartItems, product]); // Add product to the cart
    setSwipedCards(prevSwiped => [...prevSwiped, product]); // Add product to swiped history
    setCurrentCards(prevCards => prevCards.slice(1)); // Remove the current product from the swipe stack
    Alert.alert("Added to Cart", `${product.title} has been added to your cart.`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== productId)); // Remove product from cart
  };

  const handleCartNavigation = () => {
    navigation.navigate('Cart', { cartItems, removeFromCart });
  };

  const restorePreviousCard = () => {
    if (swipedCards.length === 0) {
      Alert.alert("No Previous Products", "There are no previous products to restore.");
      return;
    }

    const lastSwiped = swipedCards[swipedCards.length - 1]; // Get the last swiped product
    setSwipedCards(prevSwiped => prevSwiped.slice(0, -1)); // Remove the last swiped product from swiped history

    setCurrentCards(prevCards => [lastSwiped, ...prevCards]); // Restore the last swiped product to the stack
  };

  const handleSwipeLeft = (product) => {
    removeFromCart(product.id); // Remove from cart if swiped left
  };

  const renderCard = (product) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCart} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more products</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeCards
        cards={currentCards}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        handleYup={addToCart} 
        handleNope={handleSwipeLeft} 
      />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={restorePreviousCard} style={styles.previousButton}>
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCartNavigation} style={styles.cartButton}>
          <Text style={styles.cartButtonText}>View Cart ({cartItems.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom:90,
    backgroundColor: 'white', 
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  previousButton: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    width: '30%',
  },
  previousButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: '#6366f1',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    width: '30%',
  },
  cartButton: {
    backgroundColor: '#6366f1',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    width: '30%',
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonCart: {
    backgroundColor: '#6366f1',
    padding: 8,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default Swiper;
