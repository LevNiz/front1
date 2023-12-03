import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  searchRequests: [],
  loading: false,
  error: null,
};

export const searchRequestSlice = createSlice({
  name: 'searchRequests',
  initialState,
  reducers: {
    fetchSearchRequestStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSearchRequestSuccess: (state, action) => {
      state.loading = false;
      state.searchRequests = action.payload;
      state.error = false;
    },
    fetchSearchRequestFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.searchRequests = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchSearchRequestStart,
  fetchSearchRequestSuccess,
  fetchSearchRequestFailure,
} = searchRequestSlice.actions;

export default searchRequestSlice.reducer;
