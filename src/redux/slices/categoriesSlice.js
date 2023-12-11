import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  categories: null,
  loading: false,
  error: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoryStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = false;
    },
    fetchCategoryFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.loading = false;
      state.categories = null;
      state.error = false;
    });
  },
});

export const {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
