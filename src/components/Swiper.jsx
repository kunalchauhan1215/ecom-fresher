import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartSuccess, deleteFromCart } from '../redux/modules/cart/cartSlice';
import productsData from '../Product.json';
import Colors from './colors';

const Swiper = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart);

  const [swipedCards, setSwipedCards] = useState([]);
  const [currentCards, setCurrentCards] = useState(productsData.products);


  const handleAddToCart = (product) => {
    if (!product) return;
    
    dispatch(addToCartSuccess({ ...product, quantity: 1 })); // Update quantity properly
    setSwipedCards(prevSwiped => [...prevSwiped, product]);
    setCurrentCards(prevCards => prevCards.slice(1));

    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.title} added successfully.`,
      position: 'top',
    });
  };

  // remove product from cart (Swipe Left)
  const handleSwipeLeft = (product) => {
    if (!product || !product.id) return;

    dispatch(deleteFromCart(product.id));

    Toast.show({
      type: 'error',
      text1: 'Removed from Cart',
      text2: `${product.title} has been removed.`,
      position: 'top',
    });
  };

  // to restore last swiped product
  const restorePreviousCard = () => {
    if (swipedCards.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'No Previous Products',
        text2: 'There are no previous products to restore.',
        position: 'top',
      });
      return;
    }

    const lastSwiped = swipedCards.pop();
    setCurrentCards(prevCards => [lastSwiped, ...prevCards]);

    Toast.show({
      type: 'info',
      text1: 'Restored Product',
      text2: `${lastSwiped.title} has been restored.`,
      position: 'top',
    });
  };


  const handleCartNavigation = () => {
    navigation.navigate('Cart');
  };


  const renderCard = (product) => (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <TouchableOpacity style={styles.buttonCart} onPress={() => handleAddToCart(product)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );


  const renderNoMoreCards = () => (
    <View style={styles.noMoreCards}>
      <Text>No more products</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeCards
        cards={currentCards}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        handleYup={handleAddToCart}  // Right Swipe = Add to Cart
        handleNope={handleSwipeLeft} // Left Swipe = Remove from Cart
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={restorePreviousCard} style={styles.previousButton}>
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
      
      </View>

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
  detailsButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    width: '30%',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  buttonCart: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
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
