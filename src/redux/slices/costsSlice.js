import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  costs: null,
  loading: false,
  error: null,
};

export const costsSlice = createSlice({
  name: 'costs',
  initialState,
  reducers: {
    fetchCostsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCostsSuccess: (state, action) => {
      state.loading = false;
      state.costs = action.payload;
      state.error = false;
    },
    fetchCostsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.costs = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchCostsStart, fetchCostsSuccess, fetchCostsFailure } =
  costsSlice.actions;

export default costsSlice.reducer;
