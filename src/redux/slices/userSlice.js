import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    registerFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOutSuccess,
} = AuthSlice.actions;
export default AuthSlice.reducer;
