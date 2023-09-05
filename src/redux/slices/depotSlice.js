import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  depots: null,
  loading: false,
  error: null,
};

export const depotSlice = createSlice({
  name: 'depots',
  initialState,
  reducers: {
    fetchDepotsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchDepotsSuccess: (state, action) => {
      state.loading = false;
      state.depots = action.payload;
      state.error = false;
    },
    fetchDepotsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.depots = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchDepotsStart, fetchDepotsSuccess, fetchDepotsFailure } =
  depotSlice.actions;

export default depotSlice.reducer;
