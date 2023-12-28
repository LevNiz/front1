import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userID: null,
  userData: null,
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
      state.user = action.payload.user;
      state.userID = action.payload.userID;
      state.userData = action.payload.userData;
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
      state.user = action.payload.user;
      state.userID = action.payload.userID;
      state.userData = action.payload.userData;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.user = null;
      state.userID = null;
      state.userData = null;
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
  logOut,
} = AuthSlice.actions;
export default AuthSlice.reducer;
