import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  buyers: null,
  loading: false,
  error: null,
};

export const buyersSlice = createSlice({
  name: 'buyers',
  initialState,
  reducers: {
    fetchBuyerStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBuyerSuccess: (state, action) => {
      state.loading = false;
      state.buyers = action.payload;
      state.error = false;
    },
    fetchBuyerFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.buyers = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchBuyerStart, fetchBuyerSuccess, fetchBuyerFailure } =
  buyersSlice.actions;
export default buyersSlice.reducer;
