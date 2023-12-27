import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  favItems: null,
  loading: false,
  error: null,
};

export const favItemsSlice = createSlice({
  name: 'favItems',
  initialState,
  reducers: {
    fetchFavItemsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFavItemsSuccess: (state, action) => {
      state.loading = false;
      state.favItems = action.payload;
      state.error = false;
    },
    fetchFavItemsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.favItems = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchFavItemsStart,
  fetchFavItemsSuccess,
  fetchFavItemsFailure,
} = favItemsSlice.actions;
export default favItemsSlice.reducer;
