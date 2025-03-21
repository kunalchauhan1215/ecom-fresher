import {put, takeLatest} from 'redux-saga/effects';
import {
  fetchProductFailure,
  fetchProductRequest,
  fetchProductSuccess,
} from './productSlice';

function* fetchAllProduct(action) {
  try {
    yield put(fetchProductSuccess(action.payload));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}

function* productSaga() {
  yield takeLatest(fetchProductRequest, fetchAllProduct);
}
export default productSaga;
