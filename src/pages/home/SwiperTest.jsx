// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import SwipeCards from 'react-native-swipe-cards';
// import productsData from '../../products.json'; 
// import { useNavigation } from '@react-navigation/native';


// const SwiperTest = () => {
//   const navigation = useNavigation();
//   const [likedProducts, setLikedProducts] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [previousProduct, setPreviousProduct] = useState(null);
//   const [lastLikedProduct, setLastLikedProduct] = useState(null);
//   const [cartItems, setCartItems] = useState([]); 

//   const handleLike = (product) => {
//     setLikedProducts([...likedProducts, product]);
//     setLastLikedProduct(product);
//     Alert.alert("Liked", `You liked: ${product.title}`);
//     setCurrentProductIndex(currentProductIndex + 1);
   
//   };

//   const handleDislike = (product) => {
//     Alert.alert("Disliked", `You disliked: ${product.title}`);
//     setCurrentProductIndex(currentProductIndex + 1);
//   };

//   const addToCart = (product) => {
//     setCartItems([...cartItems, product]);
      
//     Alert.alert("Added to Cart", `${product.title} has been added to your cart.`);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems(cartItems.filter(item => item.id !== productId));
//     Alert.alert("Removed from Cart", "Product has been removed from your cart.");
//   };

//   const renderCard = (product) => {
//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: product.thumbnail }} style={styles.image} />
//         <Text style={styles.productTitle}>{product.title}</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.buttonDislike} onPress={() => handleDislike(product)}>
//             <Text style={styles.buttonText}>Dislike</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buttonLike} onPress={() => handleLike(product)}>
//             <Text style={styles.buttonText}>Like</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buttonCart} onPress={() => addToCart(product)}>
//             <Text style={styles.buttonText}>Add to Cart</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const renderNoMoreCards = () => {
//     return (
//       <View style={styles.noMoreCards}>
//         <Text>No more products</Text>
//       </View>
//     );
//   };

//   const handleDetailsNavigation = () => {
//     navigation.navigate('Profile');
//   };

//   const handleBackToPreviousProduct = () => {
//     if (previousProduct) {
//       const previousProductIndex = productsData.products.findIndex(product => product.id === previousProduct.id);
//       setCurrentProductIndex(previousProductIndex);
//       Alert.alert("Returned", `Returned to: ${previousProduct.title}`);
//     } else {
//       Alert.alert("No Previous Product", "There is no previous product to return to.");
//     }
//   };

//   const handleCartNavigation = () => {
//     navigation.navigate('Cart', { cartItems, onRemoveFromCart: removeFromCart });
//   };

//   const handleYup = (product) => {
//     if (currentProductIndex > 0) {
//       setPreviousProduct(productsData.products[currentProductIndex - 1]);
//     }
//     handleLike(product);
//     addToCart(product);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleDetailsNavigation} style={styles.detailsButton}>
//         <Text style={styles.detailsButtonText}>Go to Profile</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleBackToPreviousProduct} style={styles.backButton}>
//         <Text style={styles.backButtonText}> Previous</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleCartNavigation} style={styles.cartButton}>
//         <Text style={styles.cartButtonText}>View Cart ({cartItems.length})</Text>
//       </TouchableOpacity>
//       <SwipeCards
//         cards={productsData.products}
//         renderCard={renderCard}
//         renderNoMoreCards={renderNoMoreCards}
//         handleYup={handleYup}
//         handleNope={handleDislike}
//         cardIndex={currentProductIndex} 
//       />
//       {lastLikedProduct && currentProductIndex >= productsData.products.length && (
//         <View style={styles.lastLikedCard}>
//           <Text style={styles.productTitle}>{lastLikedProduct.title}</Text>
//           <Image source={{ uri: lastLikedProduct.thumbnail }} style={styles.image} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#FFCCCB', // Light pink background
//   },
//   detailsButton: {
//     backgroundColor: '#FF69B4', // Hot pink
//     padding: 10,
//     borderRadius: 20, // Curved corners
//     alignItems: 'center',
//     marginBottom: 10,
//     elevation: 3,
//     width: '30%',
//   },
//   backButton: {
//     backgroundColor: '#FF1493', // Deep pink
//     padding: 10,
//     borderRadius: 20, // Curved corners
//     alignItems: 'center',
//     marginBottom: 10,
//     elevation: 3,
//     width: '30%',
//   },
//   cartButton: {
//     backgroundColor: '#FFB6C1', // Light pink
//     padding: 10,
//     borderRadius: 20, // Curved corners
//     alignItems: 'center',
//     marginBottom: 0,
//     elevation: 3,
//     width: '30%',
//   },
//   backButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   detailsButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   cartButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   card: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   productTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 300,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   buttonDislike: {
//     backgroundColor: '#FF6347', // Tomato
//     padding: 8,
//     borderRadius: 20, // Curved corners
//     flex: 1,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   buttonLike: {
//     backgroundColor: '#32CD32', // Lime green
//     padding: 8,
//     borderRadius: 20, // Curved corners
//     flex: 1,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   buttonCart: {
//     backgroundColor: '#1E90FF', // Dodger blue
//     padding: 8,
//     borderRadius: 20, // Curved corners
//     flex: 1,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: '#FFFFFF', // White text
//     fontWeight: 'bold',
//   },
//   noMoreCards: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   lastLikedCard: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 12,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
// });

// export default SwiperTest;





import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import productsData from '../../products.json'; 
import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';

const SwiperTest = () => {
  const navigation = useNavigation();
  const [likedProducts, setLikedProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [previousProduct, setPreviousProduct] = useState(null);
  const [lastLikedProduct, setLastLikedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]); 
  const [lastSwipedProduct, setLastSwipedProduct] = useState(null); // Track the last swiped product

  const handleLike = (product) => {
    setLikedProducts([...likedProducts, product]);
    setLastLikedProduct(product);
    setLastSwipedProduct(product); // Store the last swiped product
    setCurrentProductIndex(currentProductIndex + 1);
  
    // Toast.show({
    //   text1: 'Liked!',
    //   text2: `${product.title} has been liked and added to your cart.`,
    //   type: 'success',
    // })
  };
  

  const handleDislike = (product) => {
    Alert.alert("Disliked", `You disliked: ${product.title}`);
    setCurrentProductIndex(currentProductIndex + 1);
 
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setLastSwipedProduct(product); // Store the last swiped product
    Alert.alert("Added to Cart", `${product.title} has been added to your cart.`);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    Alert.alert("Removed from Cart", "Product has been removed from your cart.");
  };

  const renderCard = (product) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.buttonDislike} onPress={() => handleDislike(product)}>
            <Text style={styles.buttonText}>Dislike</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLike} onPress={() => handleLike(product)}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity> */}
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

  const handleDetailsNavigation = () => {
    navigation.navigate('Profile');
  };

  const handleBackToPreviousProduct = () => {
    if (lastSwipedProduct) {
      const previousProductIndex = productsData.products.findIndex(product => product.id === lastSwipedProduct.id);
      setCurrentProductIndex(previousProductIndex);
      Alert.alert("Returned", `Returned to: ${lastSwipedProduct.title}`);
    } else {
      Alert.alert("No Previous Product", "There is no previous product to return to.");
    }
  };

  const handleCartNavigation = () => {
    navigation.navigate('Cart', { cartItems, onRemoveFromCart: removeFromCart });
  };

  const handleYup = (product) => {
    if (currentProductIndex > 0) {
      setPreviousProduct(productsData.products[currentProductIndex - 1]);
    }
    handleLike(product);
    addToCart(product);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDetailsNavigation} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Go to Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToPreviousProduct} style={styles.backButton}>
        <Text style={styles.backButtonText}> Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCartNavigation} style={styles.cartButton}>
        <Text style={styles.cartButtonText}>View Cart ({cartItems.length})</Text>
      </TouchableOpacity>
      <SwipeCards
        cards={productsData.products}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        handleYup={handleYup}
        handleNope={handleDislike}
        cardIndex={currentProductIndex} 
      />
      {lastLikedProduct && currentProductIndex >= productsData.products.length && (
        <View style={styles.lastLikedCard}>
          <Text style={styles.productTitle}>{lastLikedProduct.title}</Text>
          <Image source={{ uri: lastLikedProduct.thumbnail }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Light pink background
  },
  detailsButton: {
    backgroundColor: '#6366f1', // Hot pink
    padding: 10,
    borderRadius: 20, // Curved corners
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    width: '30%',
  },
  backButton: {
    backgroundColor: '#6366f1', // Deep pink
    padding: 10,
    borderRadius: 20, // Curved corners
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    width: '30%',
  },
  cartButton: {
    backgroundColor: '#6366f1', // Light pink
    padding: 10,
    borderRadius: 20, // Curved corners
    alignItems: 'center',
    marginBottom: 0,
    elevation: 3,
    width: '30%',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    padding: 16,
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
  buttonDislike: {
    backgroundColor: '#FF6347', // Tomato
    padding: 8,
    borderRadius: 20, // Curved corners
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonLike: {
    backgroundColor: '#32CD32', // Lime green
    padding: 8,
    borderRadius: 20, // Curved corners
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonCart: {
    backgroundColor: '#6366f1', // Dodger blue
    padding: 8,
    borderRadius: 20, // Curved corners
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lastLikedCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'white',
 marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SwiperTest;