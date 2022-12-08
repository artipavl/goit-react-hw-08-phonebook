import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFiltre(state, action) {
      state.value = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { changeFiltre } = filterSlice.actions;
