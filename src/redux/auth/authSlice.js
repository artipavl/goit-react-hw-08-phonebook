import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { authLogin } from './operations/authLogin';
import { authLogout } from './operations/authLogout';
import { authSignup } from './operations/authSignup';
import { authCurrent } from './operations/authCurrent';

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

    [authCurrent.pending](state) {
      state.isRefreshing = true;
    },
    [authCurrent.fulfilled](state, action) {
      if (!action.payload) {
        state.token = null;
      } else {
        state.user = action.payload;
        state.isLoggedIn = true;
      }
      state.isRefreshing = false;
    },
    [authCurrent.rejected](state, action) {
      state.isRefreshing = false;
      state.token = null;
      state.isLoggedIn = true;
      state.error = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['token'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

// export const authReducer = authSlice.reducer;
