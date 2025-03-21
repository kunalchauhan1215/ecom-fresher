import {all} from 'redux-saga/effects';
import cartSaga from './modules/cart/cartSaga';
import productSaga from './modules/products/productsSaga';
// import authSaga from '../redux/modules/auth/authSaga'


export default function* rootSaga() {
  yield all([
    // authSaga(), 
    cartSaga(), 
    productSaga()]);
}