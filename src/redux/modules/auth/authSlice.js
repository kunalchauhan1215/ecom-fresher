import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    signupRequest: state => {
      state.status = 'loading';
    },
    signupSuccess: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    },
    signupFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {signupRequest, signupSuccess, signupFailure} = authSlice.actions;
export default authSlice.reducer;
