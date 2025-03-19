import {call, put, takeLatest} from 'redux-saga/effects';
import {USER_API} from '../../../api/api';
import {signupRequest} from './authSlice';

function* handleSignup(action) {
  try {
    const response = yield call(
      axios.get,
      `${USER_API}?email=${action.payload.email}`,
    );
    const existingUser = response?.data[0];
    console.log(existingUser, 'userrrr');

    if (existingUser) {
      alert('user already exist');
    } else {
      const users = yield axios.get(USER_API);

      const usersData = users.data;
      const newUserId =
        usersData.length > 0 ? Math.max(...usersData.map(e => e.id)) + 1 : 1;
      console.log(newUserId, 'userdata');
      const newUser = {id: JSON.stringify(newUserId), ...action.payload};
      const response = yield call(axios.post, usersApi, newUser);
      console.log(response.data, 'hello');

      yield put(signupSuccess(newUser));
      navigate('/');
    }
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}
// Watcher Saga
function* authSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
}
export default authSaga;
