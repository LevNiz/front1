import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  applications: null,
  loading: false,
  error: null,
};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    fetchApplicationStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchApplicationSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
      state.error = false;
    },
    fetchApplicationFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.applications = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchApplicationStart,
  fetchApplicationSuccess,
  fetchApplicationFailure,
} = applicationSlice.actions;

export default applicationSlice.reducer;
