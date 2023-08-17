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
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    authFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } =
  AuthSlice.actions;
export default AuthSlice.reducer;
