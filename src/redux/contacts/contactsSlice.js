import { createSlice } from '@reduxjs/toolkit';
import { fetchAll } from './operations/fetchAll';
import { deleteContact } from './operations/deleteContact';
import { addContact } from './operations/addContact';
import { authLogout } from 'redux/auth/operations/authLogout';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchAll.pending](state) {
      state.isLoading = true;
    },
    [fetchAll.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.value = action.payload;
    },
    [fetchAll.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
      // state.value = [];
    },

    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.value = state.value.filter(
        contact => contact.id !== action.payload.id
      );
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.value.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // [authLogout.pending](state) {

    // },
    [authLogout.fulfilled](state, action) {
      state.value = [];
    },
    [authLogout.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
