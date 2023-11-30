import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  alaket: null,
  count: null,
  loading: false,
  error: null,
};

export const alaketSlice = createSlice({
  name: 'alaket',
  initialState,
  reducers: {
    fetchAlaketStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchAlaketSuccess: (state, action) => {
      state.loading = false;
      state.alaket = action.payload;
      state.error = false;
    },
    fetchAlaketFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchAlaketCountStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchAlaketCountSuccess: (state, action) => {
      state.loading = false;
      state.count = action.payload;
      state.error = false;
    },
    fetchAlaketCountFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.alaket = null;
      state.count = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchAlaketStart,
  fetchAlaketSuccess,
  fetchAlaketFailure,
  fetchAlaketCountStart,
  fetchAlaketCountSuccess,
  fetchAlaketCountFailure,
} = alaketSlice.actions;

export default alaketSlice.reducer;
