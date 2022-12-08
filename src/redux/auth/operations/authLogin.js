import { createAsyncThunk } from '@reduxjs/toolkit';
import { postLogin } from 'API/API';

export const authLogin = createAsyncThunk(
  'auth/login',
  async (article, thunkAPI) => {
    try {
      const response = await postLogin(article);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
