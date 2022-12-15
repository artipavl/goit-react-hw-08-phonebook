import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearAuthHeader, postLogout} from 'API/API';

export const authLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await postLogout();
      clearAuthHeader();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
