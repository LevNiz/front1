import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  stores: null,
  loading: false,
  error: null,
};

export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    fetchStoreStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchStoreSuccess: (state, action) => {
      state.loading = false;
      state.stores = action.payload;
      state.error = false;
    },
    fetchStoreFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.stores = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchStoreStart, fetchStoreSuccess, fetchStoreFailure } =
  storeSlice.actions;

export default storeSlice.reducer;
