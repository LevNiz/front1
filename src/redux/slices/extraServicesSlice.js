import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  extraServices: null,
  loading: false,
  error: null,
};

export const extraServicesSlice = createSlice({
  name: 'extraServices',
  initialState,
  reducers: {
    fetchExtraServicesStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchExtraServicesSuccess: (state, action) => {
      state.loading = false;
      state.extraServices = action.payload;
      state.error = false;
    },
    fetchExtraServicesFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.extraServices = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchExtraServicesStart,
  fetchExtraServicesSuccess,
  fetchExtraServicesFailure,
} = extraServicesSlice.actions;

export default extraServicesSlice.reducer;
