import {put, takeLatest} from 'redux-saga/effects';
import {
  addToCartFailure,
  addToCartRequest,
  addToCartSuccess,
} from './cartSlice';

function* addToCart(action) {
  try {
    if (action) {
      yield put(addToCartSuccess(action.payload));
    }
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}

function* cartSaga() {
  yield takeLatest(addToCartRequest, addToCart);
}

export default cartSaga;
