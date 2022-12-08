import { createAsyncThunk } from '@reduxjs/toolkit';
import { postSignup, setAuthHeader } from 'API/API';

export const authSignup = createAsyncThunk(
  'auth/signup',
  async (article, thunkAPI) => {
    try {
      const response = await postSignup(article);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
