import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrent } from 'API/API';

export const authCurrent = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  try {
    const response = await getCurrent();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
