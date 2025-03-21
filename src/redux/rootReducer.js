import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './modules/auth/authSlice';
import cartSlice from './modules/cart/cartSlice';
import productSlice from './modules/products/productSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  product:productSlice
});

export default rootReducer;
