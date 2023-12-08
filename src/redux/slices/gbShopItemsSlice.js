import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  homeItems: null,
  loading: false,
  error: null,
};

const gbShopItemsSlice = createSlice({
  name: 'homeItems',
  initialState,
  reducers: {
    fetchGBShopItemsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchGBShopItemsSuccess: (state, action) => {
      state.loading = false;
      state.homeItems = action.payload;
      state.error = false;
    },
    fetchGBShopItemsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.loading = false;
      state.homeItems = null;
      state.error = null;
    });
  },
});

export const {
  fetchGBShopItemsStart,
  fetchGBShopItemsSuccess,
  fetchGBShopItemsFailure,
} = gbShopItemsSlice.actions;

export default gbShopItemsSlice.reducer;
