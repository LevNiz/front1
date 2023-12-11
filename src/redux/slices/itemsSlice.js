import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  items: null,
  loading: false,
  error: false,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    fetchItemsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = false;
    },
    fetchItemsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.loading = false;
      state.items = null;
      state.error = false;
    });
  },
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure } =
  itemsSlice.actions;

export default itemsSlice.reducer;
