import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Toast from 'react-native-toast-message';
import productsData from '../pages/home/products.json';
import { useNavigation } from '@react-navigation/native';
import Colors from './colors';

const Swiper = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [swipedCards, setSwipedCards] = useState([]);
  const [currentCards, setCurrentCards] = useState(productsData.products);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setSwipedCards(prevSwiped => [...prevSwiped, product]);
    setCurrentCards(prevCards => prevCards.slice(1));

    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.title} has been added.`,
      position: 'bottom',
    });
  };

  const removeFromCart = (productId, productTitle) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== productId));

    Toast.show({
      type: 'error',
      text1: 'Product Removed',
      text2: `${productTitle} has been removed.`,
      position: 'bottom',
    });
  };

  const handleCartNavigation = () => {
    navigation.navigate('Cart', { cartItems, removeFromCart });
  };

  const restorePreviousCard = () => {
    if (swipedCards.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'No Previous Products',
        text2: 'There are no previous products to restore.',
        position: 'bottom',
      });
      return;
    }

    const lastSwiped = swipedCards[swipedCards.length - 1];
    setSwipedCards(prevSwiped => prevSwiped.slice(0, -1));
    setCurrentCards(prevCards => [lastSwiped, ...prevCards]);

    Toast.show({
      type: 'info',
      text1: 'Restored Product',
      text2: `${lastSwiped.title} has been restored.`,
      position: 'bottom',
    });
  };

  const handleSwipeLeft = (product) => {
    removeFromCart(product.id, product.title);
    
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

      {/* Toast Notification Component */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  previousButton: {
    backgroundColor: Colors.primary,
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
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    width: '30%',
  },
  cartButton: {
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.primary,
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
