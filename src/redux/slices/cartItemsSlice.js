import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  cartItems: null,
  loading: false,
  error: null,
};

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    fetchCartItemsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCartItemsSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.error = false;
    },
    fetchCartItemsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.cartItems = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchCartItemsStart,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
} = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
