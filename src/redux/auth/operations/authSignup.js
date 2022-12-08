import { createAsyncThunk } from '@reduxjs/toolkit';
import { postSignup } from 'API/API';

export const authSignup = createAsyncThunk(
  'auth/signup',
  async (article, thunkAPI) => {
    try {
      const response = await postSignup(article);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
