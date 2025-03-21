import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from '../../redux/modules/cart/cartSlice';
import RazorpayCheckout from 'react-native-razorpay';

// const Home = ({userdata}) => {
const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart?.cart);
  console.log(cartData);
  const route = useRoute();
  const navigation = useNavigation();
  const userdata = route.params?.user;

  const getTotalPrice = () => {
    let total = 0;
    cartData.map(item => {
      total = total + item.quantity * item.price;
    });
    return total.toFixed(2);
  };
  const getTotalQuantity = () => {
    let total = 0;
    cartData.map(item => {
      total = total + item.quantity;
    });
    return total;
  };
  const RAZOR_PAY_KEY_ID = 'rzp_test_5OVlZZrtAotZUi';
  const RAZOR_PAY_KEY_SECRET = '7wF2Osy6TMtM0GREP8XqxhNm';
  const rupeeAmount = (getTotalPrice() * 100).toFixed(2);

  const handleCheckOut = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: RAZOR_PAY_KEY_ID,
      amount: rupeeAmount,
      name: 'Ecom App',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
      padding: 20,
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        dispatch(clearCart());
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
      
  };

  const renderItems = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => dispatch(deleteFromCart(item.id))}
        style={styles.heartWrap}>
        {' '}
        <Image
          style={styles.heart}
          source={require('../../assests/icons/delete.png')}
        />
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
        <Text style={styles.title}>Description: $ {item.price}</Text>
        <Text style={styles.title}>quantity {item.quantity} </Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            title="+"
            onPress={() => dispatch(increaseQuantity(item.id))}>
            <Text style={styles.quantitybuttonText}>+</Text>
          </TouchableOpacity>{' '}
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            title="+"
            onPress={() => dispatch(decreaseQuantity(item.id))}>
            {item.quantity !== 1 ? (
              <Text style={styles.quantitybuttonText}>-</Text>
            ) : (
              <Image
                style={styles.deleteFromCartButton}
                source={require('../../assests/icons/delete.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  //   const {username} = route.params?.user;

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Text style={styles.productHeading}>Products from cart</Text> */}

      {cartData.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={cartData}
            keyExtractor={item => item.id}
            renderItem={renderItems}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center' ,justifyContent:'center'}}>
          <Text style={styles.title} >
            {' '}
            no item in the cart
          </Text>
        </View>
      )}
      
      <View style={styles.bottomBar}>
        {getTotalQuantity() > 0 ? (
          <View>
            <Text style={styles.title}>
              TotalQuantity: {getTotalQuantity()}
            </Text>
            <Text style={styles.title}>TotalPrice: Rs.{rupeeAmount}</Text>
          </View>
        ) : (
          <Text style={styles.title}>No Item In the Cart</Text>
        )}
        <View>
          {getTotalQuantity() > 0 && (
            <TouchableOpacity
              onPress={() => handleCheckOut()}
              style={
                getTotalQuantity() > 0
                  ? styles.CheckOutButtonActive
                  : styles.CheckOutButtonDisable
              }>
              <Text style={styles.CheckOutText}>Checkout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
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
  // products: {
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   shadowColor: '#000',
  //   shadowOpacity: 1,
  //   shadowRadius: 5,
  //   elevation: 10, // Android shadow
  //   margin: 10,
  //   overflow: 'hidden',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  productHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heart: {
    height: 30,
    width: 30,
  },
  heartWrap: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: 'black',
    padding: 10,
    borderRadius: 100,
  },
  bottomBar: {
    padding: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 10,
    padding: 10,
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
  deleteFromCartButton: {
    width: 14,
    height: 20,
    paddingVertical: 12,
    resizeMode: 'cover',
    objectFit: 'cover',
    tintColor: 'white',
  },
  CheckOutButtonActive: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  CheckOutButtonDisable: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  CheckOutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
