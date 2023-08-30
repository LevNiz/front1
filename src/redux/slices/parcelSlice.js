import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parcels: null,
  loading: false,
  error: null,
};

export const parcelsSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {
    fetchParcelsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchParcelsSuccess: (state, action) => {
      state.loading = false;
      state.parcels = action.payload;
      state.error = false;
    },
    fetchParcelsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchParcelsStart, fetchParcelsSuccess, fetchParcelsFailure } =
  parcelsSlice.actions;

export default parcelsSlice.reducer;
