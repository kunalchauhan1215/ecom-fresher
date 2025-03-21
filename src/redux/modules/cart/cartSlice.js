import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

// ADD TO CART FUNCTION FOR INCREASING THE QUANTITY ONLY IF DATA ALREADY EXISTS
const addItemToCart = (cart, newItem) => {
  const existingItem = cart.find(item => item.id === newItem.id);

  if (existingItem) {
    return cart.map(item =>
      item.id === newItem.id ? {...item, quantity: item.quantity + 1} : item,
    );
  } else {
    return [...cart, {...newItem, quantity: newItem.quantity}];
  }
};

const cartSlice = createSlice({
  name: 'addToCart',
  initialState: {
    cart: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCartRequest: state => {
      state.status = 'loading';
    },
    addToCartSuccess: (state, action) => {
      state.status = 'succeeded';
      state.cart = addItemToCart(state.cart, action.payload);
      // state.quantity=[...state.quantity,{id:action.payload.id,quantity:action.payload.quantity}]
      // state.cart = [...state.cart, {...action.payload, quantity: 1}];
      console.log(state.cart);
    },
    addToCartFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearCart: state => {
      state.cart = [];
      // Alert.alert('cart is empty');
    },
    deleteFromCart:(state, action)=>{
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(item => item.id !== action.payload);
        }
       
      }
    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
