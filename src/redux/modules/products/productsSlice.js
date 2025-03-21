import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    product: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchProductRequest: state => {
      state.status = 'loading';
    },
    fetchProductSuccess: (state, action) => {
      state.status = 'succeeded';
      state.product = action.payload;
    },
    fetchProductFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    toggleLike: (state, action) => {
      const likeProduct = state.product.find(p => p.id === action.payload);
      if (likeProduct) {
        likeProduct.liked = !likeProduct.liked;
      }

      // Sort: Liked products first
      state.product.sort((a, b) => {
        if (b.liked && !a.liked) return 1; // Move liked items up
        if (!b.liked && a.liked) return -1; // Move unliked items down
        return 0; // Keep the same order if both are same
      });
    },
  },
});
export const {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  toggleLike,
} = productSlice.actions;

export default productSlice.reducer;