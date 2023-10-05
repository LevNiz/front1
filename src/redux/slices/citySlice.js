import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  cities: null,
  loading: false,
  error: null,
};

export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    fetchCitiesStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCitiesSuccess: (state, action) => {
      state.loading = false;
      state.cities = action.payload;
      state.error = false;
    },
    fetchCitiesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.cities = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchCitiesStart,
  fetchCitiesSuccess,
  fetchCitiesFailure,
} = citySlice.actions;

export default citySlice.reducer;
