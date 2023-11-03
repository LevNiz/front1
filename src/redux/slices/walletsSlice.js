import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  walletHistory: null,
  loading: false,
  error: null,
};

export const walletHistorySlice = createSlice({
  name: 'walletHistory',
  initialState,
  reducers: {
    fetchWalletHistoryStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchWalletHistorySuccess: (state, action) => {
      state.loading = false;
      state.walletHistory = action.payload;
      state.error = false;
    },
    fetchWalletHistoryFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.walletHistory = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchWalletHistoryStart,
  fetchWalletHistorySuccess,
  fetchWalletHistoryFailure,
} = walletHistorySlice.actions;

export default walletHistorySlice.reducer;
