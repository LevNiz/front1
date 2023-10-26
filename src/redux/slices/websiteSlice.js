import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  websites: null,
  loading: false,
  error: null,
};

export const websiteSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    fetchWebsiteStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchWebsiteSuccess: (state, action) => {
      state.loading = false;
      state.websites = action.payload;
      state.error = false;
    },
    fetchWebsiteFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.websites = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchWebsiteStart, fetchWebsiteSuccess, fetchWebsiteFailure } =
  websiteSlice.actions;

export default websiteSlice.reducer;
