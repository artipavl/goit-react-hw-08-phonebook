import { createSlice } from '@reduxjs/toolkit';
import { authLogin } from './operations/authLogin';
import { authLogout } from './operations/authLogout';
import { authSignup } from './operations/authSignup';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: {
    // [authSignup.pending](state) {
    //   state.isRefreshing = true;
    // },
    [authSignup.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authSignup.rejected](state, action) {
      // state.isRefreshing = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },

    // [authLogin.pending](state) {
    //   state.isRefreshing = true;
    // },
    [authLogin.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authLogin.rejected](state, action) {
      // state.isRefreshing = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },

    // [authLogout.pending](state) {
    //   state.isRefreshing = true;
    // },
    [authLogout.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
    [authLogout.rejected](state, action) {
      // state.isRefreshing = false;
      state.isLoggedIn = true;
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
