import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  addresses: null,
  loading: false,
  error: null,
};

export const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    fetchAddressStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchAddressSuccess: (state, action) => {
      state.loading = false;
      state.addresses = action.payload;
      state.error = false;
    },
    fetchAddressFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.addresses = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchAddressStart, fetchAddressSuccess, fetchAddressFailure } =
  addressesSlice.actions;
export default addressesSlice.reducer;
