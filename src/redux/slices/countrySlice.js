import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  countries: null,
  loading: false,
  error: null,
};

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    fetchCountriesStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCountriesSuccess: (state, action) => {
      state.loading = false;
      state.countries = action.payload;
      state.error = false;
    },
    fetchCountriesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.countries = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
} = countrySlice.actions;

export default countrySlice.reducer;
