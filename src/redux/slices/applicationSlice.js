import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './userSlice';

const initialState = {
  applications: null,
  archiveApplications: null,
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
    fetchArchiveApplicationStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchArchiveApplicationSuccess: (state, action) => {
      state.loading = false;
      state.archiveApplications = action.payload;
      state.error = false;
    },
    fetchArchiveApplicationFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.applications = null;
      state.archiveApplications = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  fetchApplicationStart,
  fetchApplicationSuccess,
  fetchApplicationFailure,
  fetchArchiveApplicationStart,
  fetchArchiveApplicationSuccess,
  fetchArchiveApplicationFailure,
} = applicationSlice.actions;

export default applicationSlice.reducer;
