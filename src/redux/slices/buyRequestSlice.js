import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  buyRequests: [],
  loading: false,
  error: null,
};

export const buyRequestSlice = createSlice({
  name: 'buyRequests',
  initialState,
  reducers: {
    fetchBuyRequestStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBuyRequestSuccess: (state, action) => {
      state.loading = false;
      state.buyRequests = action.payload;
      state.error = false;
    },
    fetchBuyRequestFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.buyRequests = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchBuyRequestStart,
  fetchBuyRequestSuccess,
  fetchBuyRequestFailure,
} = buyRequestSlice.actions;

export default buyRequestSlice.reducer;
