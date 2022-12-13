import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrent } from 'API/API';

export const authCurrent = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  try {
    const response = await getCurrent();
    // setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});
