import { all } from 'redux-saga/effects';
// import authSaga from './modules/auth/authSaga';
import cartSaga from './modules/cart/cartSaga';
import productSaga from './modules/products/productSaga';

export default function* rootSaga() {
  yield all([cartSaga(), productSaga()]);
}
